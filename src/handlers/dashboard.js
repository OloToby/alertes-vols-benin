// ---------------------------------------------------------------------------
// Dashboard partenaire gouvernemental
// ---------------------------------------------------------------------------
import { FONT_CSS } from '../fonts.js';

export async function handleDashboardData(request, env) {
  try {
    const url = new URL(request.url);
    const days = Math.min(parseInt(url.searchParams.get('days') || '30', 10), 180);
    const since = new Date(Date.now() - days * 24 * 3600 * 1000).toISOString();

    const [
      subSummary,
      geoVisits,
      geoConfirmed,
      timeline,
      hourly,
      channels,
      devices,
      browsers,
      funnel,
      recent,
    ] = await env.DB.batch([
      // 1. Subscriber summary
      env.DB.prepare(
        `SELECT COUNT(*) as total,
          SUM(CASE WHEN confirmed_at >= datetime('now','-1 day') THEN 1 ELSE 0 END) as today,
          SUM(CASE WHEN confirmed_at >= datetime('now','-7 days') THEN 1 ELSE 0 END) as week,
          SUM(CASE WHEN confirmed_at >= datetime('now','-30 days') THEN 1 ELSE 0 END) as month,
          SUM(sms_consent) as sms_optin, MAX(confirmed_at) as last_at
          FROM subscribers WHERE status='confirmed'`
      ),

      // 2. Geography — landing visits
      env.DB.prepare(
        `SELECT country, COUNT(DISTINCT session_id) as n FROM analytics_events
          WHERE event_name='page_view' AND page='/' AND country IS NOT NULL AND country != ''
          GROUP BY country ORDER BY n DESC LIMIT 20`
      ),

      // 3. Geography — confirmed subscribers
      env.DB.prepare(
        `SELECT country, COUNT(DISTINCT session_id) as n FROM analytics_events
          WHERE event_name='payment_completed' AND country IS NOT NULL AND country != ''
          GROUP BY country ORDER BY n DESC LIMIT 20`
      ),

      // 4. Daily timeline
      env.DB.prepare(
        `SELECT DATE(created_at) as day,
          COUNT(DISTINCT CASE WHEN event_name='page_view' AND page='/' THEN session_id END) as visitors,
          COUNT(DISTINCT CASE WHEN event_name='payment_initiated' THEN session_id END) as initiated,
          COUNT(DISTINCT CASE WHEN event_name='payment_completed' THEN session_id END) as completed
          FROM analytics_events WHERE created_at >= ? GROUP BY DATE(created_at) ORDER BY day`
      ).bind(since),

      // 5. Hourly distribution
      env.DB.prepare(
        `SELECT CAST(strftime('%H', created_at) AS INTEGER) as hour_utc,
          COUNT(DISTINCT session_id) as n FROM analytics_events
          WHERE event_name='page_view' AND page='/' GROUP BY hour_utc ORDER BY hour_utc`
      ),

      // 6. Channels with conversion
      env.DB.prepare(
        `SELECT v.referrer_type, v.visits, COALESCE(p.payments,0) as payments
          FROM (SELECT referrer_type, COUNT(DISTINCT session_id) as visits FROM analytics_events
            WHERE event_name='page_view' AND page='/' GROUP BY referrer_type) v
          LEFT JOIN (SELECT ae1.referrer_type, COUNT(DISTINCT ae1.session_id) as payments
            FROM analytics_events ae1 JOIN analytics_events ae2 ON ae1.session_id=ae2.session_id
            WHERE ae1.event_name='page_view' AND ae1.page='/' AND ae2.event_name='payment_completed'
            GROUP BY ae1.referrer_type) p ON v.referrer_type=p.referrer_type ORDER BY v.visits DESC`
      ),

      // 7. Devices
      env.DB.prepare(
        `SELECT device, COUNT(DISTINCT session_id) as n FROM analytics_events
          WHERE event_name='page_view' AND page='/' AND device IS NOT NULL AND device != ''
          GROUP BY device ORDER BY n DESC`
      ),

      // 8. Browsers
      env.DB.prepare(
        `SELECT browser, COUNT(DISTINCT session_id) as n FROM analytics_events
          WHERE event_name='page_view' AND page='/' AND browser IS NOT NULL AND browser != ''
          GROUP BY browser ORDER BY n DESC LIMIT 6`
      ),

      // 9. Funnel
      env.DB.prepare(
        `SELECT
          COUNT(DISTINCT CASE WHEN event_name='page_view' AND page='/' THEN session_id END) as landing,
          COUNT(DISTINCT CASE WHEN event_name='page_view' AND page='/inscription' THEN session_id END) as inscription,
          COUNT(DISTINCT CASE WHEN event_name='payment_initiated' THEN session_id END) as payment_init,
          COUNT(DISTINCT CASE WHEN event_name='payment_completed' THEN session_id END) as payment_done
          FROM analytics_events WHERE created_at >= ?`
      ).bind(since),

      // 10. Recent significant events
      env.DB.prepare(
        `SELECT event_name, country, device, browser, referrer_type, created_at,
          COALESCE(json_extract(metadata,'$.field'), json_extract(metadata,'$.code'), '') as detail
          FROM analytics_events
          WHERE event_name NOT IN ('scroll_depth','cta_click','share_click','page_view')
            AND NOT (event_name='form_error' AND json_extract(metadata,'$.field') IN ('turnstile','ratelimit'))
          ORDER BY created_at DESC LIMIT 300`
      ),
    ]);

    return new Response(JSON.stringify({
      days,
      subscribers: subSummary.results[0] || { total: 0, today: 0, week: 0, month: 0, sms_optin: 0, last_at: null },
      geo_visits:   geoVisits.results   || [],
      geo_confirmed: geoConfirmed.results || [],
      timeline:     timeline.results     || [],
      hourly:       hourly.results       || [],
      channels:     channels.results     || [],
      devices:      devices.results      || [],
      browsers:     browsers.results     || [],
      funnel:       funnel.results[0]    || { landing: 0, inscription: 0, payment_init: 0, payment_done: 0 },
      recent:       recent.results       || [],
      generated_at: new Date().toISOString(),
    }, null, 2), {
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (err) {
    console.error('handleDashboardData error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }
}

export async function handleDashboardExport(request, env) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT event_name, country, device, browser, referrer_type, created_at,
        COALESCE(json_extract(metadata,'$.field'), json_extract(metadata,'$.code'), '') as detail
        FROM analytics_events
        WHERE event_name NOT IN ('scroll_depth','cta_click','share_click','page_view')
          AND NOT (event_name='form_error' AND json_extract(metadata,'$.field') IN ('turnstile','ratelimit'))
        ORDER BY created_at DESC`
    ).all();

    const rows = results || [];
    const escape = (v) => {
      const s = String(v == null ? '' : v);
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };

    const lines = ['date,event,detail,pays,device,navigateur,source'];
    for (const r of rows) {
      lines.push([
        escape(r.created_at),
        escape(r.event_name),
        escape(r.detail),
        escape(r.country),
        escape(r.device),
        escape(r.browser),
        escape(r.referrer_type),
      ].join(','));
    }

    return new Response(lines.join('\n'), {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': 'attachment; filename="alertes-vols-benin-analytics.csv"',
      },
    });
  } catch (err) {
    console.error('handleDashboardExport error:', err);
    return new Response('Export error: ' + String(err), { status: 500 });
  }
}

export function handleDashboardPage() {
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tableau de bord partenaire | Alertes Vols Bénin</title>
  <link rel="icon" type="image/svg+xml" href="/logo-icon.svg">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
  <style>${FONT_CSS}
    :root{
      --deep:#1B2B3C;--accent:#e8112d;--bg:#F8F6F1;--bg2:#FFFFFF;
      --muted:#667888;--line:rgba(27,43,60,0.10);
      --green:#008751;--green-light:#e8f5ee;
      --yellow:#FCD116;--yellow-light:#fef9e7;
      --red:#E8112D;--red-light:#fde8eb;
      --font-display:'Sora',ui-sans-serif,system-ui,sans-serif;
      --font-body:'Sora',ui-sans-serif,system-ui,sans-serif;
      --radius:12px;--shadow:0 2px 8px rgba(27,43,60,0.07);
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;min-width:0}
    html{overflow-x:hidden}
    html,body{height:100%;font-family:var(--font-body);background:var(--bg);color:var(--deep);-webkit-font-smoothing:antialiased;max-width:100vw;overflow-x:hidden}

    /* AUTH */
    #auth-screen{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:var(--deep);background-image:radial-gradient(ellipse at 20% 50%,rgba(0,135,81,0.15) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(252,209,22,0.07) 0%,transparent 50%)}
    .auth-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.11);border-radius:20px;padding:40px;max-width:400px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,0.4);backdrop-filter:blur(12px)}
    .auth-logo{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:24px}
    .auth-logo-icon{width:44px;height:44px;border-radius:12px;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:22px}
    .auth-logo-text{font-family:var(--font-display);font-size:15px;font-weight:600;color:rgba(255,255,255,0.90)}
    .flag-stripe{display:flex;height:3px;border-radius:2px;overflow:hidden;margin-bottom:28px}
    .flag-stripe div:nth-child(1){flex:1;background:var(--green)}
    .flag-stripe div:nth-child(2){flex:2;background:var(--yellow)}
    .flag-stripe div:nth-child(3){flex:1;background:var(--red)}
    .auth-title{font-family:var(--font-display);font-size:22px;font-weight:700;margin-bottom:6px;color:#fff}
    .auth-sub{font-size:13px;color:rgba(255,255,255,0.45);margin-bottom:24px}
    .auth-label{display:block;font-size:11px;font-weight:600;color:rgba(255,255,255,0.5);letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px}
    .secret-input{width:100%;padding:13px 16px;background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.12);border-radius:10px;font-size:15px;font-family:var(--font-body);color:#fff;margin-bottom:14px;transition:border-color .2s,background .2s}
    .secret-input::placeholder{color:rgba(255,255,255,0.25)}
    .secret-input:focus{outline:none;border-color:var(--green);background:rgba(255,255,255,0.09)}
    .auth-btn{width:100%;padding:14px;background:var(--green);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;font-family:var(--font-body);cursor:pointer;transition:background .2s,transform .12s;display:flex;align-items:center;justify-content:center;gap:8px}
    .auth-btn:hover{background:#006640;transform:translateY(-1px)}
    .auth-error{display:none;margin-top:14px;font-size:13px;color:#ff8a8a;text-align:center;padding:10px;background:rgba(232,17,45,0.12);border-radius:8px;border:1px solid rgba(232,17,45,0.2)}

    /* LAYOUT */
    #dashboard{display:none;min-height:100vh;flex-direction:column;width:100%;overflow-x:hidden}
    /* ── HEADER ── */
    .topbar{background:var(--green);padding:0 clamp(14px,3vw,28px);height:54px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,0.15);width:100%}
    .wordmark{display:inline-flex;align-items:center;gap:10px;color:#fff;text-decoration:none}
    .wordmark-label{font-family:var(--font-display);font-size:15px;font-weight:600;color:rgba(255,255,255,0.90)}
    /* ── HAMBURGER ── */
    .flag-nav-wrap{position:relative}
    .flag-chip{width:38px;height:26px;border-radius:5px;cursor:pointer;border:none;padding:0;background:none;position:relative;transition:transform .15s,box-shadow .15s;box-shadow:0 0 0 1px rgba(255,255,255,0.28)}
    .flag-chip:hover{transform:scale(1.06);box-shadow:0 0 0 2px rgba(255,255,255,0.55)}
    .flag-bg{position:absolute;inset:0;border-radius:5px;overflow:hidden;display:grid;grid-template-columns:2fr 3fr;grid-template-rows:1fr 1fr;pointer-events:none}
    .flag-bg span:nth-child(1){grid-row:1/3;grid-column:1;background:#008751}
    .flag-bg span:nth-child(2){grid-row:1;grid-column:2;background:#FCD116}
    .flag-bg span:nth-child(3){grid-row:2;grid-column:2;background:#E8112D}
    .hb-line{position:absolute;left:50%;transform:translateX(-50%);width:18px;height:2px;background:#fff;border-radius:1px;box-shadow:0 0 3px rgba(0,0,0,0.5);pointer-events:none;transition:transform .22s,opacity .22s,top .22s,width .22s}
    .hb-line:nth-child(2){top:6px}
    .hb-line:nth-child(3){top:12px}
    .hb-line:nth-child(4){top:18px}
    .flag-chip[aria-expanded="true"] .hb-line:nth-child(2){top:12px;transform:translateX(-50%) rotate(45deg)}
    .flag-chip[aria-expanded="true"] .hb-line:nth-child(3){opacity:0;width:0}
    .flag-chip[aria-expanded="true"] .hb-line:nth-child(4){top:12px;transform:translateX(-50%) rotate(-45deg)}
    .flag-nav{position:absolute;top:calc(100% + 10px);right:0;min-width:220px;background:rgba(4,8,14,0.96);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:6px;box-shadow:0 8px 32px rgba(0,0,0,0.5);opacity:0;transform:translateY(-6px) scale(0.97);pointer-events:none;transition:opacity .18s,transform .18s;z-index:200;backdrop-filter:blur(12px)}
    .flag-nav.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
    .flag-nav a,.flag-nav button{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;color:rgba(255,255,255,0.85);text-decoration:none;font-size:14px;font-weight:600;font-family:var(--font-display);letter-spacing:0.01em;transition:background .12s,color .12s;background:none;border:none;cursor:pointer;width:100%;text-align:left;box-sizing:border-box}
    .flag-nav a:hover,.flag-nav button:hover{background:rgba(255,255,255,0.08);color:#fff}
    .flag-nav-sep{height:1px;background:rgba(255,255,255,0.08);margin:4px 0}
    .flag-nav .item-danger{color:#ff8a8a}
    .flag-nav .item-danger:hover{background:rgba(232,17,45,0.15);color:#ffb3bb}
    .flag-nav .item-active,.flag-nav button.active{background:rgba(255,255,255,0.15);color:#fff}
    .refresh-tag{font-size:11px;color:rgba(255,255,255,0.6);white-space:nowrap}
    .flag-bar{height:3px;display:flex;width:100%}
    .flag-bar span:nth-child(1){flex:2;background:#008751}
    .flag-bar span:nth-child(2){flex:3;background:#FCD116}
    .flag-bar span:nth-child(3){flex:2;background:#E8112D}
    .dash-body{flex:1;padding:clamp(12px,2.5vw,24px) clamp(12px,3vw,28px);max-width:1280px;margin:0 auto;width:100%;overflow-x:hidden}
    .refresh-tag{font-size:11px;color:rgba(255,255,255,0.6);white-space:nowrap}

    /* SECTIONS */
    .sec-title{font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--deep);margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid var(--line)}
    .section{margin-bottom:28px}

    /* OVERVIEW CARDS */
    .ov-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:12px}
    .ov-card{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);padding:18px 20px;box-shadow:var(--shadow);overflow:hidden;word-break:break-word}
    .ov-label{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.09em;margin-bottom:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ov-num{font-family:var(--font-display);font-size:clamp(22px,5vw,34px);font-weight:800;line-height:1;color:var(--green);margin-bottom:4px;overflow:hidden;text-overflow:ellipsis}
    .ov-sub{font-size:12px;color:var(--muted);word-break:break-word}
    .ov-last{font-size:12px;color:var(--muted);font-style:italic;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}

    /* FUNNEL */
    .funnel-row{display:flex;align-items:center;gap:0;margin-bottom:20px;width:100%}
    .funnel-step{flex:1;min-width:0;text-align:center;background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);padding:14px 8px;box-shadow:var(--shadow);overflow:hidden}
    .funnel-num{font-family:var(--font-display);font-size:clamp(18px,4vw,28px);font-weight:800;color:var(--deep);line-height:1;white-space:nowrap}
    .funnel-label{font-size:10px;color:var(--muted);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .funnel-pct{font-size:10px;color:var(--muted);margin-top:2px}
    .funnel-arrow{padding:0 4px;font-size:18px;color:var(--muted);flex-shrink:0;text-align:center;display:flex;flex-direction:column;align-items:center;gap:2px}
    .funnel-drop{font-size:10px;color:var(--red);font-weight:600;writing-mode:initial}

    /* CHART CONTAINERS */
    .chart-wrap{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);overflow:hidden;width:100%}
    .chart-wrap canvas{max-width:100%!important}
    .chart-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;width:100%}
    .chart-title{font-size:13px;font-weight:600;color:var(--deep);margin-bottom:14px}
    .peak-pills{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
    .peak-pill{background:var(--green-light);color:#005230;border-radius:999px;padding:4px 12px;font-size:11px;font-weight:600}

    /* GEO */
    .geo-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;width:100%}
    .geo-card{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);padding:16px;box-shadow:var(--shadow);overflow:hidden;min-width:0}
    .geo-title{font-size:12px;font-weight:700;color:var(--deep);margin-bottom:12px;text-transform:uppercase;letter-spacing:.06em}
    .geo-row{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--line);font-size:12px;min-width:0}
    .geo-row:last-child{border-bottom:none}
    .geo-country{flex:1;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
    .geo-count{font-weight:700;color:var(--deep);min-width:28px;text-align:right;flex-shrink:0}
    .geo-bar-wrap{width:50px;height:6px;background:var(--line);border-radius:3px;overflow:hidden;flex-shrink:0}
    .geo-bar{height:100%;background:var(--green);border-radius:3px}
    .region-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:4px;width:100%}
    .region-card{background:var(--bg2);border:1px solid var(--line);border-radius:10px;padding:12px 8px;text-align:center;box-shadow:var(--shadow);overflow:hidden;min-width:0}
    .region-label{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .region-num{font-family:var(--font-display);font-size:clamp(16px,3vw,22px);font-weight:700;color:var(--deep)}

    /* CHANNELS */
    .channels-wrap{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:start;overflow:hidden;width:100%}
    .channels-chart-box{overflow:hidden;min-width:0;width:100%}
    .conv-table-box{overflow-x:auto;-webkit-overflow-scrolling:touch}
    .conv-table{font-size:12px;white-space:nowrap;border-collapse:collapse}
    .conv-table th{text-align:left;padding:4px 8px;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
    .conv-table td{padding:5px 8px;border-bottom:1px solid var(--line)}

    /* AUDIENCE */
    .audience-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .doughnut-wrap{max-width:220px;margin:0 auto}
    .mobile-note{margin-top:14px;font-size:12px;color:var(--muted);background:var(--bg);border-radius:8px;padding:10px 12px;border-left:3px solid var(--green)}

    /* EVENTS TABLE */
    .events-card{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)}
    .events-head{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--line);background:var(--bg)}
    .events-title{font-size:13px;font-weight:600;color:var(--deep)}
    .events-table{width:100%;border-collapse:collapse}
    .events-table th{padding:8px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;border-bottom:1px solid var(--line);background:var(--bg);white-space:nowrap}
    .events-table td{padding:8px 14px;font-size:12px;border-bottom:1px solid var(--line);vertical-align:middle}
    .events-table tr:last-child td{border-bottom:none}
    .events-table tbody tr:hover td{background:#faf9f6}
    .badge{display:inline-block;padding:2px 9px;border-radius:999px;font-size:11px;font-weight:700}
    .b-confirmed{background:var(--green-light);color:#005230}
    .b-initiated{background:var(--yellow-light);color:#6b5700}
    .b-cancelled{background:var(--red-light);color:#8b0000}
    .b-email{background:var(--green-light);color:#005230}
    .b-form{background:#e8f0fe;color:#1a3c8b}
    .b-error{background:#f0f0f0;color:#555}
    .b-unsub{background:var(--red-light);color:#8b0000}
    .b-default{background:#f0f0f0;color:var(--muted)}
    .pag-row{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:var(--bg);border-top:1px solid var(--line)}
    .pag-info{font-size:12px;color:var(--muted)}
    .pag-btns{display:flex;gap:8px}
    .pag-btn{padding:5px 14px;border:1px solid var(--line);border-radius:7px;background:var(--bg2);font-size:12px;font-weight:600;cursor:pointer;color:var(--deep)}
    .pag-btn:disabled{opacity:.4;cursor:not-allowed}
    .pag-btn:not(:disabled):hover{background:var(--green-light);color:var(--green)}

    /* FOOTER */
    .dash-footer{text-align:center;font-size:11px;color:var(--muted);padding:18px;border-top:1px solid var(--line);background:var(--bg2);margin-top:16px}

    @media(max-width:900px){
      .ov-grid{grid-template-columns:1fr 1fr}
      .geo-grid{grid-template-columns:1fr}
      .region-cards{grid-template-columns:1fr 1fr}
      .audience-grid{grid-template-columns:1fr}
      .channels-wrap{grid-template-columns:1fr}
    }
    @media(max-width:600px){
      .topbar{padding:0 10px}
      .wordmark-label{font-size:13px}
      .refresh-tag{display:none}
      .dash-body{padding:12px}
      .section{margin-bottom:20px}
      .ov-grid{grid-template-columns:1fr 1fr;gap:8px}
      .ov-card{padding:14px 12px}
      .funnel-row{flex-direction:column;align-items:stretch;gap:0}
      .funnel-step{min-width:0;padding:12px}
      .funnel-arrow{text-align:center;padding:4px 0}
      .funnel-arrow .fa-icon{display:inline-block;transform:rotate(90deg)}
      .funnel-num{font-size:clamp(20px,6vw,28px)}
      .region-cards{grid-template-columns:1fr 1fr;gap:8px}
      .channels-wrap{grid-template-columns:1fr;gap:12px}
      .channels-chart-box{min-height:160px}
      .chart-wrap{padding:14px 12px;overflow:hidden}
      .doughnut-wrap{max-width:200px}
      .geo-bar-wrap{display:none}
      .events-card{overflow:hidden}
      .events-table th:nth-child(4),.events-table td:nth-child(4){display:none}
      .events-table{font-size:11px;table-layout:fixed;width:100%}
      .events-table th,.events-table td{padding:7px 8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .events-table th:nth-child(1),.events-table td:nth-child(1){width:30%}
      .events-table th:nth-child(2),.events-table td:nth-child(2){width:35%}
      .events-table th:nth-child(3),.events-table td:nth-child(3){width:15%}
      .events-table th:nth-child(5),.events-table td:nth-child(5){width:20%}
      .pag-row{flex-direction:column;align-items:flex-start;gap:8px;padding:10px 12px}
      .ov-last{font-size:11px}
    }
    @media(max-width:400px){
      .ov-grid{grid-template-columns:1fr 1fr}
    }
  </style>
</head>
<body>

<div id="auth-screen">
  <div class="auth-card">
    <div class="auth-logo">
      <img src="/logo-icon.svg" alt="" style="width:44px;height:44px;border-radius:12px;display:block">
      <span class="auth-logo-text">Alertes Vols Bénin</span>
    </div>
    <div class="flag-stripe"><div></div><div></div><div></div></div>
    <div class="auth-title">Tableau de bord partenaire</div>
    <div class="auth-sub">Données de demande sociale &middot; Usage réservé au partenaire institutionnel</div>
    <label class="auth-label" for="secret-inp">Clé d'accès</label>
    <input id="secret-inp" class="secret-input" type="password" placeholder="Entrez votre cle..." autocomplete="off">
    <button class="auth-btn" id="auth-btn">
      <span>Accéder au tableau de bord</span>
    </button>
    <div class="auth-error" id="auth-error">Accès refusé</div>
  </div>
</div>

<div id="dashboard">
  <header class="topbar">
    <a href="/" class="wordmark">
      <img src="/logo-icon.svg" alt="" style="width:36px;height:36px;border-radius:8px;display:block;flex-shrink:0">
      <span class="wordmark-label">Alertes Vols Bénin | Dashboard</span>
    </a>
    <div style="display:flex;align-items:center;gap:12px">
      <span class="refresh-tag" id="refresh-tag">Actualisation dans <span id="countdown">60</span>s</span>
      <div class="flag-nav-wrap">
        <button class="flag-chip" id="flagMenuBtn" aria-label="Menu" aria-expanded="false" aria-controls="flagNav">
          <div class="flag-bg"><span></span><span></span><span></span></div>
          <span class="hb-line"></span>
          <span class="hb-line"></span>
          <span class="hb-line"></span>
        </button>
        <nav class="flag-nav" id="flagNav" role="menu">
          <button role="menuitem" id="btn-30" onclick="closeFlagNav();changeDays(30)">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M4 8h8M8 4v8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            30 jours
          </button>
          <button role="menuitem" id="btn-90" onclick="closeFlagNav();changeDays(90)">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M4 8h8M8 4v8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            90 jours
          </button>
          <button role="menuitem" id="btn-180" onclick="closeFlagNav();changeDays(180)">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M4 8h8M8 4v8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            180 jours
          </button>
          <div class="flag-nav-sep"></div>
          <button role="menuitem" onclick="closeFlagNav();exportCSV()">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 12h10M8 3v7M5 7l3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Exporter CSV
          </button>
          <div class="flag-nav-sep"></div>
          <a href="/admin" role="menuitem">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 8H3M6 5L3 8l3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ← Admin
          </a>
          <button role="menuitem" class="item-danger" onclick="closeFlagNav();logout()">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 8h7M10 5l3 3-3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            Déconnexion
          </button>
        </nav>
      </div>
    </div>
  </header>
  <div class="flag-bar"><span></span><span></span><span></span></div>

  <div class="dash-body">

    <!-- SECTION 1 : Vue d'ensemble -->
    <div class="section">
      <div class="sec-title">Vue d'ensemble</div>
      <div class="ov-grid">
        <div class="ov-card">
          <div class="ov-label">Inscrits confirmes</div>
          <div class="ov-num" id="ov-total">—</div>
          <div class="ov-sub" id="ov-today"></div>
        </div>
        <div class="ov-card">
          <div class="ov-label">Cette semaine</div>
          <div class="ov-num" id="ov-week">—</div>
          <div class="ov-sub" id="ov-month"></div>
        </div>
        <div class="ov-card">
          <div class="ov-label">Taux de conversion</div>
          <div class="ov-num" id="ov-conv">—</div>
          <div class="ov-sub">paiements complétés / initiés</div>
        </div>
        <div class="ov-card">
          <div class="ov-label">Opt-in SMS</div>
          <div class="ov-num" id="ov-sms">—</div>
          <div class="ov-sub">alertes SMS activees</div>
        </div>
      </div>
      <div class="ov-last" id="ov-last"></div>
    </div>

    <!-- SECTION 2 : Funnel -->
    <div class="section">
      <div class="sec-title">De la decouverte a l'inscription</div>
      <div class="funnel-row" id="funnel-row"></div>
    </div>

    <!-- SECTION 3 : Chronologie -->
    <div class="section">
      <div class="sec-title">Chronologie de la mobilisation</div>
      <div class="chart-wrap">
        <div class="chart-title">Mobilisation jour par jour</div>
        <canvas id="chart-timeline" height="80"></canvas>
        <div class="peak-pills" id="peak-pills"></div>
      </div>
    </div>

    <!-- SECTION 4 : Geographie -->
    <div class="section">
      <div class="sec-title">Geographie de la demande</div>
      <div class="geo-grid">
        <div class="geo-card">
          <div class="geo-title">Top 10 pays — visites</div>
          <div id="geo-visits-list"></div>
        </div>
        <div class="geo-card">
          <div class="geo-title">Top 10 pays — inscrits</div>
          <div id="geo-confirmed-list"></div>
        </div>
      </div>
      <div class="region-cards">
        <div class="region-card"><div class="region-label">France</div><div class="region-num" id="reg-fr">—</div></div>
        <div class="region-card"><div class="region-label">Bénin</div><div class="region-num" id="reg-bj">—</div></div>
        <div class="region-card"><div class="region-label">Afrique (hors Bénin)</div><div class="region-num" id="reg-af">—</div></div>
        <div class="region-card"><div class="region-label">Reste du monde</div><div class="region-num" id="reg-world">—</div></div>
      </div>
    </div>

    <!-- SECTION 5 : Canaux -->
    <div class="section">
      <div class="sec-title">Canaux d'acquisition</div>
      <div class="chart-wrap">
        <div class="channels-wrap">
          <div class="channels-chart-box">
            <canvas id="chart-channels" height="120"></canvas>
          </div>
          <div class="conv-table-box">
            <table class="conv-table">
              <thead><tr><th>Canal</th><th>Visites</th><th>Inscrits</th><th>Taux</th></tr></thead>
              <tbody id="conv-table-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 6 : Audience -->
    <div class="section">
      <div class="sec-title">Profil de l'audience</div>
      <div class="audience-grid">
        <div class="chart-wrap">
          <div class="chart-title">Appareils</div>
          <div class="doughnut-wrap"><canvas id="chart-devices"></canvas></div>
          <div class="mobile-note" id="mobile-note"></div>
        </div>
        <div class="chart-wrap">
          <div class="chart-title">Navigateurs</div>
          <div class="doughnut-wrap"><canvas id="chart-browsers"></canvas></div>
        </div>
      </div>
    </div>

    <!-- SECTION 7 : Historique -->
    <div class="section">
      <div class="events-card">
        <div class="events-head">
          <span class="events-title">Historique complet des evenements</span>
          <button class="hbtn" style="background:#e8f5ee;color:#005230;border-color:#c3e6d0" onclick="exportCSV()">Exporter CSV</button>
        </div>
        <div style="overflow-x:auto">
          <table class="events-table">
            <thead>
              <tr>
                <th>Date/heure</th>
                <th>Événement</th>
                <th>Pays</th>
                <th>Device</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody id="events-tbody"></tbody>
          </table>
        </div>
        <div class="pag-row">
          <span class="pag-info" id="pag-info"></span>
          <div class="pag-btns">
            <button class="pag-btn" id="pag-prev" onclick="changePage(-1)">&#8592; Précédent</button>
            <button class="pag-btn" id="pag-next" onclick="changePage(1)">Suivant &#8594;</button>
          </div>
        </div>
      </div>
    </div>

  </div>
  <footer class="dash-footer" id="dash-footer"></footer>
</div>

<script>
Chart.defaults.font.family = 'Sora';

var _secret = '';
var _currentDays = 30;
var _data = null;
var _pagePage = 0;
var _pagSize = 50;
var _countdownVal = 60;
var _countdownTimer = null;
var _refreshTimer = null;

var chartTimeline = null;
var chartChannels = null;
var chartDevices = null;
var chartBrowsers = null;

var AFRICAN_CODES = ['DZ','AO','BJ','BW','BF','BI','CM','CV','CF','TD','KM','CG','CD','CI','DJ','EG','GQ','ER','ET','GA','GM','GH','GN','GW','KE','LS','LR','LY','MG','MW','ML','MR','MU','MA','MZ','NA','NE','NG','RW','ST','SN','SC','SL','SO','ZA','SS','SD','SZ','TZ','TG','TN','UG','ZM','ZW'];

document.getElementById('secret-inp').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') doAuth();
});
document.getElementById('auth-btn').addEventListener('click', doAuth);

function doAuth() {
  var s = document.getElementById('secret-inp').value.trim();
  if (!s) return;
  document.getElementById('auth-btn').textContent = 'Connexion...';
  document.getElementById('auth-error').style.display = 'none';
  fetch('/admin/dashboard/data?days=30', { headers: { 'Authorization': 'Bearer ' + s } })
    .then(function(r) {
      if (!r.ok) throw new Error('Unauthorized');
      return r.json();
    })
    .then(function(data) {
      _secret = s;
      try { sessionStorage.setItem('dash_secret', s); } catch(e) {}
      document.getElementById('auth-screen').style.display = 'none';
      document.getElementById('dashboard').style.display = 'flex';
      _data = data;
      _currentDays = 30;
      setActiveDaysBtn(30);
      renderAll(data);
      startCountdown();
    })
    .catch(function() {
      document.getElementById('auth-btn').textContent = 'Accéder au tableau de bord';
      document.getElementById('auth-error').style.display = 'block';
    });
}

function changeDays(d) {
  _currentDays = d;
  setActiveDaysBtn(d);
  loadData(_secret, d);
}

function setActiveDaysBtn(d) {
  ['30','90','180'].forEach(function(v) {
    var btn = document.getElementById('btn-' + v);
    if (btn) btn.classList.toggle('active', String(d) === v);
  });
}

function loadData(secret, days) {
  fetch('/admin/dashboard/data?days=' + days, { headers: { 'Authorization': 'Bearer ' + secret } })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      _data = data;
      renderAll(data);
      resetCountdown();
    })
    .catch(function(e) { console.error('load error', e); });
}

function setCountdown(val) {
  var el = document.getElementById('countdown');
  if (el) el.textContent = val;
}

function startCountdown() {
  _countdownVal = 60;
  setCountdown(60);
  if (_countdownTimer) clearInterval(_countdownTimer);
  _countdownTimer = setInterval(function() {
    _countdownVal--;
    setCountdown(_countdownVal);
    if (_countdownVal <= 0) {
      _countdownVal = 60;
      loadData(_secret, _currentDays);
    }
  }, 1000);
}

function resetCountdown() {
  _countdownVal = 60;
  setCountdown(60);
}

window.addEventListener('beforeunload', function() {
  if (_countdownTimer) clearInterval(_countdownTimer);
});

function exportCSV() {
  var a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);
  fetch('/admin/dashboard/export.csv', { headers: { 'Authorization': 'Bearer ' + _secret } })
    .then(function(r) { return r.blob(); })
    .then(function(blob) {
      var url = URL.createObjectURL(blob);
      a.href = url;
      a.download = 'alertes-vols-benin-analytics.csv';
      a.click();
      setTimeout(function() { URL.revokeObjectURL(url); document.body.removeChild(a); }, 2000);
    });
}

function renderAll(data) {
  renderOverview(data);
  renderFunnel(data.funnel);
  renderTimeline(data.timeline);
  renderGeo(data.geo_visits, data.geo_confirmed);
  renderChannels(data.channels);
  renderAudience(data.devices, data.browsers);
  renderEvents(data.recent);
  document.getElementById('dash-footer').textContent =
    'Données collectées par alertesvolsbenin.com · Service indépendant, non affilié à Bénin Tours S.A. · Mis à jour le ' + (data.generated_at || '');
}

function renderOverview(data) {
  var s = data.subscribers || {};
  var f = data.funnel || {};
  document.getElementById('ov-total').textContent = fmt(s.total || 0);
  document.getElementById('ov-today').textContent = '↑ ' + fmt(s.today || 0) + " aujourd'hui";
  document.getElementById('ov-week').textContent = fmt(s.week || 0);
  document.getElementById('ov-month').textContent = 'et ' + fmt(s.month || 0) + ' ce mois';
  var conv = f.payment_init > 0 ? Math.round(f.payment_done / f.payment_init * 100) : 0;
  document.getElementById('ov-conv').textContent = conv + '%';
  var smsP = s.total > 0 ? Math.round((s.sms_optin || 0) / s.total * 100) : 0;
  document.getElementById('ov-sms').textContent = smsP + '%';
  if (s.last_at) {
    var diff = Math.round((Date.now() - new Date(s.last_at).getTime()) / 60000);
    document.getElementById('ov-last').textContent =
      'Derniere inscription il y a ' + diff + ' minutes · ' + s.last_at;
  }
}

function renderFunnel(f) {
  if (!f) return;
  var steps = [
    { label: 'Landing', val: f.landing || 0 },
    { label: 'Page inscription', val: f.inscription || 0 },
    { label: 'Paiement initié', val: f.payment_init || 0 },
    { label: 'Confirmé', val: f.payment_done || 0 }
  ];
  var container = document.getElementById('funnel-row');
  container.innerHTML = '';
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
    var prev = i > 0 ? steps[i-1].val : step.val;
    var pct = prev > 0 ? Math.round(step.val / prev * 100) : 100;
    var drop = 100 - pct;
    var div = document.createElement('div');
    div.className = 'funnel-step';
    var pctHtml = i > 0 ? ('<div class="funnel-pct" style="color:var(--muted)">' + pct + '% du step precedent</div>') : '';
    div.innerHTML = '<div class="funnel-num">' + fmt(step.val) + '</div><div class="funnel-label">' + step.label + '</div>' + pctHtml;
    container.appendChild(div);
    if (i < steps.length - 1) {
      var arrow = document.createElement('div');
      arrow.className = 'funnel-arrow';
      arrow.innerHTML = '<span class="fa-icon" style="font-size:20px;color:var(--muted)">&#8594;</span>' + (drop > 30 ? '<span class="funnel-drop" style="font-size:10px;display:block;text-align:center">-' + drop + '%</span>' : '');
      container.appendChild(arrow);
    }
  }
}

function renderTimeline(rows) {
  if (!rows || !rows.length) return;
  var labels = rows.map(function(r) { return r.day; });
  var visitors = rows.map(function(r) { return r.visitors || 0; });
  var initiated = rows.map(function(r) { return r.initiated || 0; });
  var completed = rows.map(function(r) { return r.completed || 0; });
  var ctx = document.getElementById('chart-timeline').getContext('2d');
  if (chartTimeline) {
    chartTimeline.data.labels = labels;
    chartTimeline.data.datasets[0].data = visitors;
    chartTimeline.data.datasets[1].data = initiated;
    chartTimeline.data.datasets[2].data = completed;
    chartTimeline.update();
  } else {
    chartTimeline = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          { label: 'Visiteurs', data: visitors, borderColor: '#008751', backgroundColor: 'transparent', tension: 0.3, pointRadius: 2 },
          { label: 'Paiements initiés', data: initiated, borderColor: '#FCD116', backgroundColor: 'transparent', tension: 0.3, pointRadius: 2 },
          { label: 'Confirmés', data: completed, borderColor: '#005230', backgroundColor: 'rgba(0,135,81,0.12)', fill: true, tension: 0.3, pointRadius: 2 }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } }
    });
  }
  var peaks = rows.slice().sort(function(a,b) { return (b.visitors||0)-(a.visitors||0); }).slice(0,3);
  var pillsEl = document.getElementById('peak-pills');
  pillsEl.innerHTML = peaks.map(function(p) {
    return '<span class="peak-pill">' + p.day + ' — ' + fmt(p.visitors||0) + ' visiteurs</span>';
  }).join('');
}

function renderGeo(visits, confirmed) {
  renderGeoList('geo-visits-list', visits || []);
  renderGeoList('geo-confirmed-list', confirmed || []);
  var src = visits || [];
  var fr = 0, bj = 0, af = 0, world = 0;
  src.forEach(function(r) {
    var c = (r.country || '').toUpperCase();
    var n = r.n || 0;
    if (c === 'FR') fr += n;
    else if (c === 'BJ') bj += n;
    else if (AFRICAN_CODES.indexOf(c) >= 0) af += n;
    else world += n;
  });
  document.getElementById('reg-fr').textContent = fmt(fr);
  document.getElementById('reg-bj').textContent = fmt(bj);
  document.getElementById('reg-af').textContent = fmt(af);
  document.getElementById('reg-world').textContent = fmt(world);
}

function renderGeoList(elId, rows) {
  var el = document.getElementById(elId);
  if (!rows.length) { el.textContent = 'Aucune donnee'; return; }
  var max = rows[0].n || 1;
  el.innerHTML = rows.slice(0,10).map(function(r) {
    var pct = Math.round((r.n||0) / max * 100);
    return '<div class="geo-row">' +
      '<span class="geo-country">' + (r.country || '?') + '</span>' +
      '<div class="geo-bar-wrap"><div class="geo-bar" style="width:' + pct + '%"></div></div>' +
      '<span class="geo-count">' + fmt(r.n||0) + '</span>' +
      '</div>';
  }).join('');
}

function renderChannels(rows) {
  if (!rows || !rows.length) return;
  var labels = rows.map(function(r) { return r.referrer_type || 'direct'; });
  var visits = rows.map(function(r) { return r.visits || 0; });
  var colors = ['#008751','#FCD116','#E8112D','#1B2B3C','#667888','#e8f5ee'];
  var ctx = document.getElementById('chart-channels').getContext('2d');
  if (chartChannels) {
    chartChannels.data.labels = labels;
    chartChannels.data.datasets[0].data = visits;
    chartChannels.update();
  } else {
    chartChannels = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{ label: 'Visites', data: visits, backgroundColor: colors.slice(0, rows.length) }]
      },
      options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } }
    });
  }
  var tbody = document.getElementById('conv-table-body');
  tbody.innerHTML = rows.map(function(r) {
    var rate = r.visits > 0 ? Math.round((r.payments||0)/r.visits*100) : 0;
    return '<tr><td>' + (r.referrer_type||'direct') + '</td><td>' + fmt(r.visits||0) + '</td><td>' + fmt(r.payments||0) + '</td><td>' + rate + '%</td></tr>';
  }).join('');
}

function renderAudience(devRows, brRows) {
  var dColors = ['#008751','#1B2B3C','#FCD116','#E8112D','#667888'];
  if (devRows && devRows.length) {
    var dLabels = devRows.map(function(r) { return r.device || '?'; });
    var dData = devRows.map(function(r) { return r.n || 0; });
    var ctx = document.getElementById('chart-devices').getContext('2d');
    if (chartDevices) {
      chartDevices.data.labels = dLabels;
      chartDevices.data.datasets[0].data = dData;
      chartDevices.update();
    } else {
      chartDevices = new Chart(ctx, {
        type: 'doughnut',
        data: { labels: dLabels, datasets: [{ data: dData, backgroundColor: dColors }] },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
      });
    }
    var total = dData.reduce(function(a,b){return a+b;},0);
    var mobileRow = devRows.find(function(r) { return (r.device||'').toLowerCase().indexOf('mobile') >= 0; });
    var mobilePct = total > 0 && mobileRow ? Math.round(mobileRow.n/total*100) : 0;
    document.getElementById('mobile-note').textContent = mobilePct + '% mobile-first — a prendre en compte pour les communications officielles (format adapte recommande)';
  }
  if (brRows && brRows.length) {
    var bLabels = brRows.map(function(r) { return r.browser || '?'; });
    var bData = brRows.map(function(r) { return r.n || 0; });
    var bCtx = document.getElementById('chart-browsers').getContext('2d');
    if (chartBrowsers) {
      chartBrowsers.data.labels = bLabels;
      chartBrowsers.data.datasets[0].data = bData;
      chartBrowsers.update();
    } else {
      chartBrowsers = new Chart(bCtx, {
        type: 'doughnut',
        data: { labels: bLabels, datasets: [{ data: bData, backgroundColor: dColors }] },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
      });
    }
  }
}

function badgeFor(event_name, detail) {
  if (event_name === 'payment_completed') return '<span class="badge b-confirmed">Inscrit ✓</span>';
  if (event_name === 'payment_initiated') return '<span class="badge b-initiated">Paiement initié</span>';
  if (event_name === 'payment_cancelled') return '<span class="badge b-cancelled">Annule</span>';
  if (event_name === 'email_confirmed') return '<span class="badge b-email">Email confirme</span>';
  if (event_name === 'form_step1_success') return '<span class="badge b-form">Formulaire soumis</span>';
  if (event_name === 'form_error') return '<span class="badge b-error">Erreur ' + esc(detail||'') + '</span>';
  if (event_name === 'unsubscribed') return '<span class="badge b-unsub">Désinscrit</span>';
  return '<span class="badge b-default">' + esc(event_name) + '</span>';
}

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function fmt(n) {
  return Number(n).toLocaleString('fr-FR');
}

function renderEvents(rows) {
  _pagPage = 0;
  window._eventsRows = rows || [];
  renderEventsPage();
}

function renderEventsPage() {
  var rows = window._eventsRows || [];
  var start = _pagPage * _pagSize;
  var slice = rows.slice(start, start + _pagSize);
  var tbody = document.getElementById('events-tbody');
  tbody.innerHTML = slice.map(function(r) {
    var dt = r.created_at ? r.created_at.replace('T',' ').substring(0,16) : '';
    return '<tr>' +
      '<td style="white-space:nowrap;color:var(--muted)">' + esc(dt) + '</td>' +
      '<td>' + badgeFor(r.event_name, r.detail) + '</td>' +
      '<td>' + esc(r.country||'') + '</td>' +
      '<td>' + esc(r.device||'') + '</td>' +
      '<td>' + esc(r.referrer_type||'') + '</td>' +
      '</tr>';
  }).join('');
  var total = rows.length;
  var pages = Math.ceil(total / _pagSize);
  document.getElementById('pag-info').textContent = 'Événements ' + (start+1) + '-' + Math.min(start+_pagSize, total) + ' sur ' + fmt(total);
  document.getElementById('pag-prev').disabled = _pagPage <= 0;
  document.getElementById('pag-next').disabled = _pagPage >= pages - 1;
}

function changePage(dir) {
  var rows = window._eventsRows || [];
  var pages = Math.ceil(rows.length / _pagSize);
  _pagPage = Math.max(0, Math.min(_pagPage + dir, pages - 1));
  renderEventsPage();
}

// Auto-login if session storage has key
try {
  var stored = sessionStorage.getItem('dash_secret');
  if (stored) {
    document.getElementById('secret-inp').value = stored;
    doAuth();
  }
} catch(e) {}

/* ── Hamburger menu ── */
(function(){
  var btn=document.getElementById('flagMenuBtn');
  var nav=document.getElementById('flagNav');
  if(!btn||!nav)return;
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    var open=nav.classList.toggle('open');
    btn.setAttribute('aria-expanded',open?'true':'false');
  });
  document.addEventListener('click',function(e){
    if(!nav.contains(e.target)&&e.target!==btn){
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  });
})();
function closeFlagNav(){
  var nav=document.getElementById('flagNav');
  var btn=document.getElementById('flagMenuBtn');
  if(nav)nav.classList.remove('open');
  if(btn)btn.setAttribute('aria-expanded','false');
}
function logout(){
  try{sessionStorage.removeItem('dash_secret');}catch(e){}
  document.getElementById('dashboard').style.display='none';
  document.getElementById('auth-screen').style.display='flex';
  document.getElementById('secret-inp').value='';
}
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
