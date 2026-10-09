import { FONT_CSS } from '../fonts.js';

export function adminPage() {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin | Alertes Vols Bénin</title>
  <link rel="icon" type="image/svg+xml" href="/logo-icon.svg">
  <style>${FONT_CSS}
    :root{
      --deep:#1B2B3C;--accent:#e8112d;--bg:#F8F6F1;--bg2:#FFFFFF;
      --muted:#667888;--line:rgba(27,43,60,0.10);
      --green:#008751;--green-light:#e8f5ee;--green-mid:rgba(0,1 35,81,0.12);
      --yellow:#FCD116;--yellow-light:#fef9e7;
      --red:#E8112D;--red-light:#fde8eb;
      --orange:#E67E22;--orange-light:#fdf0e6;
      --font-display:'Sora', ui-sans-serif, system-ui, sans-serif;
      --font-body:'Sora', ui-sans-serif, system-ui, sans-serif;
      --radius:12px;--shadow:0 2px 8px rgba(27,43,60,0.07);
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html, body{height:100%;font-family:var(--font-body);background:var(--bg);color:var(--deep);-webkit-font-smoothing:antialiased}

    /* ── AUTH ── */
    #auth-screen{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:var(--deep);background-image:radial-gradient(ellipse at 20% 50%,rgba(0,135,81,0.15) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,r gba(252,209,22,0.07) 0%,t ransparent 50%)}
    .auth-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.11);border-radius:20px;padding:40px;max-width:400px;width:100%;box-shadow:0 24px 64px rgba(0,0 ,0 ,0.4);backdrop-filter:blur(12px)}
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
    .secret-input{width:100%;padding:13px 16px;background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.12);border-radius:10px;font-size:15px;font-family:var(--font-body);color:#fff;margin-bottom:14px;transition:border-color .2s,b ackground .2s}
    .secret-input::placeholder{color:rgba(255,255,255,0.25)}
    .secret-input:focus{outline:none;border-color:var(--green);background:rgba(255,255,255,0.09)}
    .auth-btn{width:100%;padding:14px;background:var(--green);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;font-family:var(--font-body);cursor:pointer;transition:background .2s,t ransform .12s;display:flex;align-items:center;justify-content:center;gap:8px}
    .auth-btn:hover{background:#006640;transform:translateY(-1px)}
    .auth-btn:active{transform:translateY(0)}
    .auth-error{display:none;margin-top:14px;font-size:13px;color:#ff8a8a;text-align:center;padding:10px;background:rgba(232,17,45,0.12);border-radius:8px;border:1px solid rgba(232,1 7,45,0.2)}

    /* ── LAYOUT ── */
    #dashboard{display:none;min-height:100vh;flex-direction:column}

    /* ── HEADER ── */
    .topbar{background:var(--green);padding:0 clamp(14px,3vw,28px);height:54px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,0.15)}
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

    /* ── BODY ── */
    .dash-body{flex:1;padding:clamp(14px,2.5vw,24px) clamp(14px,3vw,28px);max-width:1280px;margin:0 auto;width:100%}

    /* ── SECTION LABEL ── */
    .sec-label{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.09em;margin-bottom:8px}

    /* ── STATS GRID ── */
    .stats-grid{display:grid;grid-template-columns:repeat(4,1 fr);gap:12px;margin-bottom:16px}
    .stat-card{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);padding:16px 18px;box-shadow:var(--shadow);transition:box-shadow .2s}
    .stat-card:hover{box-shadow:0 4px 16px rgba(27,43,60,0.11)}
    .stat-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
    .stat-lbl{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.09em}
    .stat-ico{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;background:rgba(27,43,60,0.06)}
    .stat-card.c-confirmed .stat-ico{background:var(--green-light)}
    .stat-card.c-pending .stat-ico{background:var(--yellow-light)}
    .stat-card.c-unsub .stat-ico{background:rgba(102,1 20,1 36,0.08)}
    .stat-num{font-family:var(--font-display);font-size:32px;font-weight:700;line-height:1;color:var(--deep)}
    .stat-card.c-confirmed .stat-num{color:var(--green)}
    .stat-card.c-pending .stat-num{color:#b8860b}
    .stat-card.c-unsub .stat-num{color:var(--muted)}
    .stat-sub{font-size:11px;color:var(--muted);margin-top:5px}

    /* ── STATUS + ROUTES ROW ── */
    .status-routes-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
    .card{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}

    /* STATUS CARD */
    .status-card{padding:16px 18px}
    .status-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
    .status-dot-row{display:flex;align-items:center;gap:8px}
    .s-dot{width:11px;height:11px;border-radius:50%;flex-shrink:0}
    .s-dot.closed{background:var(--red)}
    .s-dot.watching{background:var(--orange)}
    .s-dot.pre_open{background:var(--yellow);animation:pulse 1.8s infinite}
    .s-dot.open_notified{background:var(--green);animation:pulse 1.8s infinite}
    @keyframes pulse{0%,1 00%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}
    .s-state-text{font-family:var(--font-display);font-size:13px;font-weight:600}
    .status-state-badge{padding:3px 9px;border-radius:999px;font-size:11px;font-weight:600}
    .status-state-badge.closed{background:var(--red-light);color:#8b0000}
    .status-state-badge.watching{background:var(--orange-light);color:#7e3c00}
    .status-state-badge.pre_open{background:var(--yellow-light);color:#6b5700}
    .status-state-badge.open_notified{background:var(--green-light);color:#005230}
    .status-meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px}
    .status-meta-item{background:var(--bg);border-radius:8px;padding:8px 10px}
    .status-meta-key{font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;margin-bottom:2px}
    .status-meta-val{font-size:12px;font-weight:500;color:var(--deep)}
    .gov-pill{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:600;background:var(--green-light);color:#005230;margin-top:8px}
    .gov-pill::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--green)}
    .gov-pill.inactive{display:none}
    .refresh-btn{padding:5px 11px;font-size:11px;font-weight:600;font-family:var(--font-body);background:var(--bg);border:1px solid var(--line);border-radius:7px;cursor:pointer;color:var(--muted);transition:background .15s,c olor .15s;display:inline-flex;align-items:center;gap:4px}
    .refresh-btn:hover{background:#eceae5;color:var(--deep)}

    /* ROUTES CARD */
    .routes-card{padding:16px 18px}
    .routes-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}
    .route-item{display:flex;align-items:center;justify-content:space-between;background:var(--bg);border-radius:8px;padding:7px 10px;gap:6px}
    .route-name{font-size:11px;font-weight:500;color:var(--deep);font-family:'SF Mono', Menlo, monospace;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .route-status{font-size:11px;font-weight:700;padding:1px 7px;border-radius:999px;flex-shrink:0}
    .route-status.s200{background:var(--green-light);color:var(--green)}
    .route-status.s404{background:var(--red-light);color:var(--red)}
    .route-status.serr{background:rgba(102,1 20,1 36,0.1);color:var(--muted)}

    /* ── CHECK RESULT ── */
    .check-result-panel{display:none;background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);margin-bottom:16px;box-shadow:var(--shadow);overflow:hidden}
    .check-result-panel.visible{display:block}
    .check-result-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--line);background:var(--bg)}
    .check-result-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--muted)}
    .check-result-close{background:none;border:none;font-size:18px;cursor:pointer;color:var(--muted);padding:2px 6px;border-radius:4px;line-height:1}
    .check-result-close:hover{background:var(--line);color:var(--deep)}
    .check-result-body{padding:14px 16px;font-size:12px;font-family:'SF Mono',S FMono-Regular,C onsolas,M enlo,m onospace;line-height:1.6;overflow-x:auto;white-space:pre-wrap;word-break:break-word;color:var(--deep);max-height:280px;overflow-y:auto}

    /* ── HISTORY ── */
    .history-card{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;margin-bottom:16px;box-shadow:var(--shadow)}
    .card-head{padding:12px 16px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;background:var(--bg)}
    .card-title{font-size:13px;font-weight:600;color:var(--deep)}
    .card-badge{font-size:11px;color:var(--muted);background:var(--bg);border:1px solid var(--line);border-radius:999px;padding:2px 8px}
    .history-table{width:100%;border-collapse:collapse}
    .history-table th{padding:8px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;border-bottom:1px solid var(--line);background:var(--bg);white-space:nowrap}
    .history-table td{padding:8px 14px;font-size:12px;border-bottom:1px solid var(--line);vertical-align:middle}
    .history-table tr:last-child td{border-bottom:none}
    .history-table tbody tr:hover td{background:#faf9f6}
    .h-badge{display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700}
    .h-badge.closed{background:var(--red-light);color:#8b0000}
    .h-badge.watching{background:var(--orange-light);color:#7e3c00}
    .h-badge.pre_open{background:var(--yellow-light);color:#6b5700}
    .h-badge.open_notified{background:var(--green-light);color:#005230}
    .marker-ok{color:var(--green);font-weight:700}
    .marker-nok{color:var(--red);font-weight:700}

    /* ── SUBSCRIBERS ── */
    .subs-card{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)}
    .subs-table{width:100%;border-collapse:collapse}
    .subs-table th{padding:10px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;border-bottom:1px solid var(--line);background:var(--bg);white-space:nowrap}
    .subs-table td{padding:11px 14px;font-size:13px;border-bottom:1px solid var(--line);vertical-align:middle;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .subs-table tr:last-child td{border-bottom:none}
    .subs-table tbody tr:hover td{background:#faf9f6}
    .badge{display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600}
    .badge-confirmed{background:var(--green-light);color:#005230}
    .badge-pending{background:var(--yellow-light);color:#6b5700}
    .badge-unsubscribed{background:var(--red-light);color:#8b0000}
    .sms-yes{color:var(--green);font-weight:700}
    .sms-no{color:var(--line);font-weight:400}

    /* MOBILE subscriber cards */
    .sub-cards{display:none}
    .sub-card{border-bottom:1px solid var(--line);padding:12px 14px}
    .sub-card:last-child{border-bottom:none}
    .sub-card-name{font-weight:600;font-size:13px;margin-bottom:4px}
    .sub-card-email{font-size:12px;color:var(--muted);margin-bottom:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .sub-card-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .sub-card-phone{font-size:11px;color:var(--muted)}

    /* ── EMPTY ── */
    .empty-state{padding:48px 24px;text-align:center}
    .empty-icon{font-size:30px;margin-bottom:10px}
    .empty-title{font-weight:600;font-size:15px;color:var(--deep);margin-bottom:6px}
    .empty-sub{font-size:13px;color:var(--muted)}

    /* ── TOAST ── */
    .toast{position:fixed;bottom:20px;right:20px;background:var(--deep);color:#fff;padding:11px 16px;border-radius:10px;font-size:13px;font-weight:500;transform:translateY(80px);opacity:0;transition:all .3s;z-index:9999;max-width:320px;line-height:1.5;box-shadow:0 8px 24px rgba(0,0 ,0 ,0.25)}
    .toast.green{background:var(--green)}
    .toast.red{background:var(--red)}
    .toast.show{transform:translateY(0);opacity:1}

    /* ── TABS ── */
    .tab-nav{display:flex;gap:2px;margin-bottom:20px;border-bottom:2px solid var(--line);padding-bottom:0}
    .tab-btn{padding:10px 18px;font-size:13px;font-weight:600;background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;color:var(--muted);font-family:var(--font-body);margin-bottom:-2px;transition:color .15s,b order-color .15s;white-space:nowrap}
    .tab-btn.active{color:var(--green);border-bottom-color:var(--green)}
    .tab-btn:hover:not(.active){color:var(--deep)}
    .tab-panel{display:none}
    .tab-panel.active{display:block}

    /* ── ANALYTICS ── */
    .a-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;gap:12px}
    .a-title{font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
    .a-period{display:flex;gap:4px}
    .a-period-btn{padding:4px 11px;font-size:11px;font-weight:600;font-family:var(--font-body);background:var(--bg);border:1px solid var(--line);border-radius:20px;cursor:pointer;color:var(--muted);transition:all .15s}
    .a-period-btn:hover{background:#eceae5;color:var(--deep)}
    .a-period-btn.active{background:var(--green);border-color:var(--green);color:#fff}

    .a-kpi-row{display:grid;grid-template-columns:repeat(4,1 fr);gap:10px;margin-bottom:14px}
    .a-kpi{background:var(--bg2);border:1px solid var(--line);border-left:3px solid var(--line);border-radius:var(--radius);padding:14px 16px;box-shadow:var(--shadow)}
    .a-kpi.c-g{border-left-color:var(--green)}
    .a-kpi.c-b{border-left-color:#3b82f6}
    .a-kpi.c-y{border-left-color:var(--yellow)}
    .a-kpi-val{font-family:var(--font-display);font-size:26px;font-weight:700;color:var(--deep);line-height:1.1}
    .a-kpi-lbl{font-size:11px;font-weight:600;color:var(--deep);margin-top:5px}
    .a-kpi-ctx{font-size:10px;color:var(--muted);margin-top:2px}

    .a-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
    .a-card{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);padding:16px 18px;box-shadow:var(--shadow)}
    .a-card-title{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px}

    .a-funnel-step{display:flex;align-items:center;gap:10px;margin-bottom:2px}
    .a-funnel-num{width:20px;height:20px;border-radius:50%;background:var(--bg);border:1.5px solid var(--line);font-size:10px;font-weight:700;color:var(--muted);display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .a-funnel-num.on{background:var(--green);border-color:var(--green);color:#fff}
    .a-funnel-bar-wrap{flex:1;background:var(--bg);border-radius:3px;height:16px;overflow:hidden}
    .a-funnel-bar{height:100%;background:var(--green);border-radius:3px;transition:width .5s ease;min-width:2px}
    .a-funnel-bar.off{background:var(--line)}
    .a-funnel-info{width:80px;flex-shrink:0;display:flex;align-items:baseline;gap:5px;justify-content:flex-end}
    .a-funnel-n{font-family:var(--font-display);font-size:13px;font-weight:700;color:var(--deep)}
    .a-funnel-pct{font-size:10px;color:var(--muted)}
    .a-funnel-lbl{font-size:10px;color:var(--muted);padding-left:30px;margin-bottom:8px}
    .a-drop{font-size:9px;font-weight:700;color:var(--red);padding-left:30px;margin-bottom:2px;letter-spacing:.02em}

    .a-insight-list{display:flex;flex-direction:column;gap:0}
    .a-insight{display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--line)}
    .a-insight:last-child{border-bottom:none}
    .a-dot{width:7px;height:7px;border-radius:50%;margin-top:4px;flex-shrink:0}
    .a-dot.g{background:var(--green)}
    .a-dot.r{background:var(--red)}
    .a-dot.y{background:#f59e0b}
    .a-dot.n{background:var(--muted)}
    .a-insight-body{flex:1;min-width:0}
    .a-insight-txt{font-size:12px;color:var(--deep);line-height:1.45}
    .a-insight-act{display:inline-block;margin-top:6px;font-size:10px;font-weight:700;padding:3px 10px;border-radius:5px;cursor:pointer;border:1px solid var(--line);color:var(--deep);background:var(--bg);font-family:var(--font-body);transition:background .15s;text-decoration:none}
    .a-insight-act:hover{background:#eceae5}

    .a-attr3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px}
    .a-attr-card{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);padding:14px 16px;box-shadow:var(--shadow)}
    .a-attr-card-title{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px}
    .a-attr-row{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--line)}
    .a-attr-row:last-child{border-bottom:none}
    .a-attr-lbl{flex:1;font-size:12px;font-weight:500;color:var(--deep);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .a-attr-bar-bg{width:52px;background:var(--bg);border-radius:3px;height:5px;overflow:hidden;flex-shrink:0}
    .a-attr-bar-fill{height:100%;background:var(--green);border-radius:3px}
    .a-attr-pct{font-size:10px;color:var(--muted);width:26px;text-align:right;flex-shrink:0}
    .a-attr-n{font-family:var(--font-display);font-size:12px;font-weight:700;color:var(--deep);width:18px;text-align:right;flex-shrink:0}

    .a-charts{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
    .a-chart-card{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);padding:14px 16px;box-shadow:var(--shadow)}
    .a-chart-title{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px}
    .a-bar-chart{display:flex;align-items:flex-end;gap:3px;height:60px}
    .a-bar-col{display:flex;flex-direction:column;align-items:center;flex:1;min-width:0}
    .a-bar-fill{background:var(--green);border-radius:2px 2px 0 0;width:100%;min-height:2px;transition:height .3s}
    .a-bar-fill:hover{background:#00b36a}
    .a-bar-lbl{font-size:8px;color:var(--muted);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:28px;text-align:center}
    .a-hourly{display:flex;align-items:flex-end;gap:2px;height:50px}
    .a-h-bar{background:var(--green);opacity:.65;border-radius:2px 2px 0 0;min-height:2px;flex:1;transition:opacity .15s}
    .a-h-bar:hover{opacity:1}

    /* Errors */
    .a-errors{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
    .error-table{width:100%;font-size:12px;border-collapse:collapse;margin-top:8px}
    .error-table td{padding:5px 6px;border-bottom:1px solid var(--line)}
    .error-table tr:last-child td{border-bottom:none}
    .error-field{font-weight:600;color:var(--deep)}
    .error-count{font-family:var(--font-display);font-weight:700;color:var(--red)}
    .error-bar-bg{width:50px;background:var(--bg);border-radius:3px;height:4px;overflow:hidden;display:inline-block;vertical-align:middle}
    .error-bar-fill{height:100%;background:var(--red);border-radius:3px}

    /* Diagnostic */
    .a-diag-sep{border:none;border-top:2px solid var(--line);margin:20px 0 16px}
    .a-diag-title{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px}
    .a-diag2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
    .a-conv-table{width:100%;border-collapse:collapse;font-size:12px}
    .a-conv-table th{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;padding:4px 8px 6px;text-align:right;border-bottom:2px solid var(--line)}
    .a-conv-table th:first-child{text-align:left}
    .a-conv-table td{padding:7px 8px;border-bottom:1px solid var(--line);color:var(--deep);vertical-align:middle}
    .a-conv-table td:not(:first-child){text-align:right;font-family:var(--font-display);font-weight:600}
    .a-conv-table tr:last-child td{border-bottom:none}
    .a-conv-pct{display:inline-block;padding:2px 7px;border-radius:20px;font-size:10px;font-weight:700}
    .a-conv-pct.hi{background:#d1fae5;color:#065f46}
    .a-conv-pct.lo{background:#fee2e2;color:#991b1b}
    .a-conv-pct.mid{background:#fef3c7;color:#92400e}
    .a-conv-pct.nil{background:var(--bg);color:var(--muted);border:1px solid var(--line)}
    .a-log-scroll{max-height:360px;overflow-y:auto;border:1px solid var(--line);border-radius:var(--radius)}
    .a-log-table{width:100%;border-collapse:collapse;font-size:11px}
    .a-log-table th{font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;padding:5px 8px;border-bottom:1px solid var(--line);text-align:left;white-space:nowrap;position:sticky;top:0;background:var(--bg2)}
    .a-log-table td{padding:5px 8px;border-bottom:1px solid var(--line);color:var(--deep);vertical-align:middle;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px}
    .a-log-table tr:last-child td{border-bottom:none}
    .a-log-evt{display:inline-block;padding:1px 6px;border-radius:20px;font-size:9px;font-weight:700;background:var(--bg);border:1px solid var(--line);color:var(--deep)}
    .a-log-evt.pv{background:#dbeafe;border-color:#93c5fd;color:#1d4ed8}
    .a-log-evt.pay{background:#d1fae5;border-color:#6ee7b7;color:#065f46}
    .a-log-evt.err{background:#fee2e2;border-color:#fca5a5;color:#991b1b}
    .a-log-evt.cta{background:#fef3c7;border-color:#fcd34d;color:#92400e}
    .a-log-sid{font-family:monospace;font-size:10px;color:var(--muted);letter-spacing:.04em}

    /* ── FOOTER ── */
    .dash-footer{padding:20px 24px;text-align:center}
    .dash-footer p{font-size:11px;color:var(--muted);line-height:1.8}
    .dash-footer a{color:var(--muted);text-decoration:none}
    .dash-footer a:hover{color:var(--deep)}
    .footer-bar{display:flex;height:4px;width:100%;margin-top:14px}
    .footer-bar span:nth-child(1){flex:1;background:var(--green)}
    .footer-bar span:nth-child(2){flex:2;background:var(--yellow)}
    .footer-bar span:nth-child(3){flex:1;background:var(--red)}

    /* ── RESPONSIVE ── */
    @media(max-width:900px){
      .status-routes-row{grid-template-columns:1fr}
      .routes-grid{grid-template-columns:1fr 1fr}
      .a-charts{grid-template-columns:1fr}
      .a-attr3{grid-template-columns:1fr 1fr}
      .a-errors{grid-template-columns:1fr}
    }
    @media(max-width:680px){
      .stats-grid{grid-template-columns:1fr 1fr}
      .a-kpi-row{grid-template-columns:1fr 1fr}
      .a-row2{grid-template-columns:1fr}
      .a-diag2{grid-template-columns:1fr}
      .routes-grid{grid-template-columns:1fr 1fr}
      .a-attr3{grid-template-columns:1fr}
      .a-errors{grid-template-columns:1fr}
      .col-phone,.col-sms,.col-date{display:none}
      .dash-wordmark{display:none}
    }
    @media(max-width:480px){
      .stats-grid{grid-template-columns:1fr 1fr}
      .a-kpi-row{grid-template-columns:1fr 1fr}
      .a-kpi-val{font-size:22px}
      .stat-num{font-size:26px}
      .subs-table{display:none}
      .sub-cards{display:block}
      .routes-grid{grid-template-columns:1fr}
      .status-meta-grid{grid-template-columns:1fr}
      .hbtn span{display:none}
      .history-table .col-marker,.history-table .col-bytes{display:none}
    }
  </style>
</head>
<body>

<!-- AUTH -->
<div id="auth-screen">
  <div class="auth-card">
    <div class="auth-logo">
      <img src="/logo-icon.svg" alt="" style="width:44px;height:44px;border-radius:12px;display:block">
      <span class="auth-logo-text">Alertes Vols Bénin</span>
    </div>
    <div class="flag-stripe"><div></div><div></div><div></div></div>
    <p class="auth-title">Dashboard Admin</p>
    <p class="auth-sub">Accès restreint, administrateurs uniquement</p>
    <label class="auth-label" for="secret-input">Mot de passe</label>
    <input class="secret-input" type="password" id="secret-input" placeholder="••••••••••••" autocomplete="current-password">
    <button class="auth-btn" id="auth-btn" onclick="authenticate()">
      Accéder
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <p class="auth-error" id="auth-error">Mot de passe incorrect. Réessayez.</p>
  </div>
</div>

<!-- DASHBOARD -->
<div id="dashboard">
  <header class="topbar">
    <a href="/" class="wordmark">
      <img src="/logo-icon.svg" alt="" style="width:36px;height:36px;border-radius:8px;display:block;flex-shrink:0">
      <span class="wordmark-label">Admin · Alertes Vols Bénin</span>
    </a>
    <div class="flag-nav-wrap">
      <button class="flag-chip" id="flagMenuBtn" aria-label="Menu" aria-expanded="false" aria-controls="flagNav">
        <div class="flag-bg"><span></span><span></span><span></span></div>
        <span class="hb-line"></span>
        <span class="hb-line"></span>
        <span class="hb-line"></span>
      </button>
      <nav class="flag-nav" id="flagNav" role="menu">
        <button role="menuitem" onclick="closeFlagNav();runCheck()">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2z" stroke="currentColor" stroke-width="1.6"/><path d="M8 5v3.5l2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          Vérifier
        </button>
        <button role="menuitem" onclick="closeFlagNav();runAction('/test-notify','Envoyer une notification de test ?')">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 5 6-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/></svg>
          Test notif
        </button>
        <button role="menuitem" onclick="closeFlagNav();runAction('/reset','Réarmer la surveillance ?')">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 2.5A6 6 0 1 1 7 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7 2l2-2M7 2l2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Réarmer
        </button>
        <div class="flag-nav-sep"></div>
        <a href="/admin/dashboard" role="menuitem">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/></svg>
          Dashboard partenaire
        </a>
        <div class="flag-nav-sep"></div>
        <button role="menuitem" class="item-danger" onclick="closeFlagNav();logout()">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 8h7M10 5l3 3-3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          Déconnexion
        </button>
      </nav>
    </div>
  </header>

  <div class="dash-body">

    <!-- TABS -->
    <nav class="tab-nav">
      <button class="tab-btn active" data-tab="dashboard" onclick="switchTab('dashboard')">Tableau de bord</button>
      <button class="tab-btn" data-tab="analytics" onclick="switchTab('analytics')">Analytics</button>
      <button class="tab-btn" data-tab="searches" onclick="switchTab('searches')">Recherches diaspora</button>
    </nav>

    <!-- TAB: DASHBOARD -->
    <div id="tab-dashboard" class="tab-panel active">

    <!-- STATS -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-top"><span class="stat-lbl">Total</span><span class="stat-ico">👥</span></div>
        <div class="stat-num" id="s-total">…</div>
        <div class="stat-sub">Tous statuts confondus</div>
      </div>
      <div class="stat-card c-confirmed">
        <div class="stat-top"><span class="stat-lbl">Confirmés</span><span class="stat-ico">✅</span></div>
        <div class="stat-num" id="s-confirmed">…</div>
        <div class="stat-sub">Email vérifié, alerte active</div>
      </div>
      <div class="stat-card c-pending">
        <div class="stat-top"><span class="stat-lbl">En attente</span><span class="stat-ico">⏳</span></div>
        <div class="stat-num" id="s-pending">…</div>
        <div class="stat-sub">Email non confirmé</div>
      </div>
      <div class="stat-card c-unsub">
        <div class="stat-top"><span class="stat-lbl">Désinscrits</span><span class="stat-ico">🔕</span></div>
        <div class="stat-num" id="s-unsub">…</div>
        <div class="stat-sub">Ont annulé leur alerte</div>
      </div>
    </div>

    <!-- STATUS + ROUTES -->
    <div class="status-routes-row">

      <!-- Statut détection -->
      <div class="card status-card">
        <div class="status-header">
          <div class="sec-label">État de surveillance</div>
          <button class="refresh-btn" onclick="loadData()" id="refresh-btn">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M13 3A6 6 0 1 1 7 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M7 2l2-2M7 2l2 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Actualiser
          </button>
        </div>
        <div class="status-dot-row">
          <span class="s-dot closed" id="s-dot"></span>
          <span class="s-state-text" id="s-text">Chargement…</span>
          <span class="status-state-badge closed" id="s-badge" style="display:none"></span>
        </div>
        <div class="status-meta-grid" id="status-meta-grid">
          <div class="status-meta-item"><div class="status-meta-key">Dernier scan</div><div class="status-meta-val" id="meta-time">—</div></div>
          <div class="status-meta-item"><div class="status-meta-key">Résultat</div><div class="status-meta-val" id="meta-result">—</div></div>
          <div class="status-meta-item"><div class="status-meta-key">Taille HTML</div><div class="status-meta-val" id="meta-bytes">—</div></div>
          <div class="status-meta-item"><div class="status-meta-key">Marqueur</div><div class="status-meta-val" id="meta-marker">—</div></div>
        </div>
        <span class="gov-pill inactive" id="gov-pill">🏛 Signal gouvernemental actif</span>
      </div>

      <!-- Routes cross-confirmation -->
      <div class="card routes-card">
        <div class="status-header">
          <div class="sec-label">Routes (cross-confirmation)</div>
          <span id="routes-summary" style="font-size:11px;color:var(--muted)"></span>
        </div>
        <div class="routes-grid" id="route-pills-container"></div>
      </div>

    </div>

    <!-- CHECK RESULT -->
    <div class="check-result-panel" id="check-result-panel">
      <div class="check-result-header">
        <span class="check-result-title">Résultat de la vérification manuelle</span>
        <button class="check-result-close" onclick="document.getElementById('check-result-panel').classList.remove('visible')">&times;</button>
      </div>
      <div class="check-result-body" id="check-result-body"></div>
    </div>

    <!-- HISTORIQUE -->
    <div class="history-card" id="history-card" style="display:none">
      <div class="card-head">
        <span class="card-title">Historique des checks</span>
        <span class="card-badge" id="history-count"></span>
      </div>
      <div id="history-container"></div>
    </div>

    <!-- ABONNÉS -->
    <div class="subs-card">
      <div class="card-head">
        <span class="card-title">Abonnés</span>
        <span class="card-badge" id="table-count">…</span>
      </div>
      <div id="table-container"><div class="empty-state"><div class="empty-icon">⏳</div><div class="empty-sub">Chargement…</div></div></div>
    </div>

    </div><!-- /tab-dashboard -->

    <!-- TAB: ANALYTICS -->
    <div id="tab-analytics" class="tab-panel">
      <div id="analytics-body">
        <div class="empty-state"><div class="empty-icon">📊</div><div class="empty-sub">Cliquez sur l'onglet pour charger les analytics.</div></div>
      </div>
    </div>

    <!-- TAB: RECHERCHES DIASPORA -->
    <div id="tab-searches" class="tab-panel">
      <div id="searches-body">
        <div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-sub">Cliquez sur l'onglet pour charger les recherches.</div></div>
      </div>
    </div>

  </div>

  <footer class="dash-footer">
    <p>Service d'alerte pour les vols spéciaux Paris‑Cotonou via <a href="https://www.voyage.benin.bj/" target="_blank" rel="noopener">voyage.benin.bj</a>.<br>Non affilié à Bénin Tours S.A. ni au Gouvernement du Bénin.</p>
    <div class="footer-bar"><span></span><span></span><span></span></div>
  </footer>
</div>

<div class="toast" id="toast"></div>

<script>
let _analyticsLoaded=false;
let _searchesLoaded=false;

function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

function fmt(n){return Number(n).toLocaleString('fr-FR')}

function switchTab(name){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b .dataset.tab===name));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active', p .id==='tab-'+name));
  if(name==='analytics'&&!_analyticsLoaded)loadAnalytics();
  if(name==='searches'&&!_searchesLoaded)loadSearches();
}

/* ── RECHERCHES DIASPORA ────────────────────────────────────────────── */

async function loadSearches(){
  _searchesLoaded=true;
  const el=document.getElementById('searches-body');
  el.innerHTML='<div class="empty-state"><div class="empty-sub">Chargement…</div></div>';
  try{
    const res=await fetch('/admin/diaspora-searches');
    if(!res.ok)throw new Error(res.status);
    const data=await res.json();
    renderSearches(el,data);
  }catch(e){
    el.innerHTML='<div class="empty-state"><div class="empty-icon">⚠️</div><div class="empty-sub">Erreur : '+esc(String(e.message))+'</div></div>';
  }
}

function renderSearches(el,rows){
  if(!rows.length){
    el.innerHTML='<div class="empty-state"><div class="empty-icon">✅</div><div class="empty-sub">Aucune recherche sans résultat enregistrée.</div></div>';
    return;
  }
  var trs=rows.map(function(r){
    return '<tr style="border-bottom:1px solid var(--border)">'
      +'<td style="padding:10px 12px;font-weight:600">'+esc(r.query)+'</td>'
      +'<td style="padding:10px 12px;text-align:center"><span class="card-badge">'+r.count+'&times;</span></td>'
      +'<td style="padding:10px 12px;text-align:right;color:var(--muted);font-size:12px">'+esc(r.last_at)+'</td>'
      +'</tr>';
  }).join('');
  el.innerHTML='<div class="subs-card">'
    +'<div class="card-head"><span class="card-title">Requêtes sans résultat (page diaspora)</span>'
    +'<span class="card-badge">'+rows.length+' requêtes</span></div>'
    +'<table style="width:100%;border-collapse:collapse;font-size:13px">'
    +'<thead><tr style="border-bottom:2px solid var(--border)">'
    +'<th style="text-align:left;padding:8px 12px;color:var(--muted)">Requête</th>'
    +'<th style="text-align:center;padding:8px 12px;color:var(--muted)">Fréquence</th>'
    +'<th style="text-align:right;padding:8px 12px;color:var(--muted)">Dernière</th>'
    +'</tr></thead><tbody>'+trs+'</tbody></table></div>';
}

/* ── ANALYTICS ─────────────────────────────────────────────────────── */

async function loadAnalytics(days=30){
  const el=document.getElementById('analytics-body');
  el.innerHTML='<div class="empty-state"><div class="empty-sub">Chargement des analytics…</div></div>';
  try{
    const res=await fetch('/admin/analytics?days='+days);
    if(!res.ok)throw new Error(res.status);
    const data=await res.json();
    _analyticsLoaded=true;
    renderAnalytics(data, days);
  }catch(e){
    el.innerHTML='<div class="empty-state"><div class="empty-icon">⚠️</div><div class="empty-sub">Erreur de chargement. La table analytics existe-t-elle ? (migration v4)</div></div>';
  }
}

const REFERRER_LABELS={direct:'Direct', facebook:'Facebook', whatsapp:'WhatsApp', instagram:'Instagram', google:'Google', twitter:'Twitter', youtube:'YouTube', tiktok:'TikTok', other:'Autre'};
const FIELD_LABELS={email:'Email', prenom:'Prénom', nom:'Nom', telephone:'Téléphone', turnstile:'Anti-bot (non bloquant)', ratelimit:'Limite dépassée', formulaire:'Formulaire', duplicate:'Email déjà inscrit'};
const DEVICE_LABELS={mobile:'Mobile', tablet:'Tablette', desktop:'Desktop', unknown:'Inconnu'};

const COUNTRY_FLAGS={FR:'🇫🇷', BE:'🇧🇪', BJ:'🇧🇯', CI:'🇨🇮', SN:'🇸🇳', CM:'🇨🇲', TG:'🇹🇬', GH:'🇬🇭', GB:'🇬🇧', DE:'🇩🇪', IT:'🇮🇹', ES:'🇪🇸', US:'🇺🇸', CA:'🇨🇦', XX:'🌍'};

function countryLabel(c){return (COUNTRY_FLAGS[c]||'🌍')+' '+c;}
function referrerLabel(r){return REFERRER_LABELS[r]||r;}
function fieldLabel(f){return FIELD_LABELS[f]||f;}
function deviceLabel(d){return DEVICE_LABELS[d]||d;}

function renderAnalytics(data, selectedDays){
  var byDim={};
  (data.attribution||[]).forEach(function(r){
    if(!byDim[r.dim])byDim[r.dim]=[];
    byDim[r.dim].push(r);
  });
  Object.keys(byDim).forEach(function(d){byDim[d].sort(function(a, b ){return b.sessions-a.sessions;});});

  var daily=(data.trend||[]).filter(function(r){return r.type==='daily';});
  var hourly=(data.trend||[]).filter(function(r){return r.type==='hourly';});

  var fm={};
  (data.funnel||[]).forEach(function(r){fm[r.step]=r.sessions||0;});
  var fSteps=[
    {key:'landing', label:'Landing page'},
    {key:'inscription', label:'Page inscription'},
    {key:'payment_init', label:'Paiement initié'},
    {key:'payment_done', label:'Abonnement activé'}
  ];
  var topVal=fm.landing||1;
  var visitors=fm.landing||0;
  var payments=fm.payment_done||0;
  var inscriptions=fm.inscription||0;
  var convRate=visitors>0?((payments/visitors)*100).toFixed(1)+'%':'—';
  var revenueImplied=payments>0?fmt(payments*5.99)+' €':'—';

  var formErrors=(data.errors||[]).filter(function(e){return e.event_name==='form_error';});
  var payErrors=(data.errors||[]).filter(function(e){return e.event_name==='payment_error';});
  var totalFormErrors=formErrors.reduce(function(s, e ){return s+e.n;},0 );
  var totalPayErrors=payErrors.reduce(function(s, e ){return s+e.n;},0 );

  var h='';

  h+='<div class="a-header">';
  h+='<div class="a-title">Trafic,'+selectedDays+' derniers jours<\/div>';
  h+='<div class="a-period">';
  [7,30,90].forEach(function(d){
    h+='<button class="a-period-btn'+(selectedDays==d?' active':'')+'" onclick="loadAnalytics('+d+')">'+d+'j<\/button>';
  });
  h+='<\/div><\/div>';

  h+='<div class="a-kpi-row">';
  h+='<div class="a-kpi c-g"><div class="a-kpi-val">'+fmt(visitors)+'<\/div><div class="a-kpi-lbl">Visiteurs<\/div><div class="a-kpi-ctx">Sessions sur la landing<\/div><\/div>';
  var insPct=visitors>0?Math.round(inscriptions/visitors*100):0;
  h+='<div class="a-kpi c-b"><div class="a-kpi-val">'+fmt(inscriptions)+'<\/div><div class="a-kpi-lbl">Ont cliqué S&#39;inscrire<\/div><div class="a-kpi-ctx">'+(visitors>0?insPct+'% des visiteurs':'En attente de trafic')+'<\/div><\/div>';
  h+='<div class="a-kpi'+(payments>0?' c-g':'')+'"><div class="a-kpi-val">'+fmt(payments)+'<\/div><div class="a-kpi-lbl">Abonnements payés<\/div><div class="a-kpi-ctx">'+revenueImplied+'<\/div><\/div>';
  h+='<div class="a-kpi c-y"><div class="a-kpi-val">'+(visitors>0?convRate:'—')+'<\/div><div class="a-kpi-lbl">Taux de conversion<\/div><div class="a-kpi-ctx">Visiteurs → paiement<\/div><\/div>';
  h+='<\/div>';

  h+='<div class="a-row2">';

  h+='<div class="a-card">';
  h+='<div class="a-card-title">Entonnoir de conversion<\/div>';
  fSteps.forEach(function(step, i ){
    var count=fm[step.key]||0;
    var pct=topVal>0?Math.max(2, Math.round(count/topVal*100)):2;
    var prev=i>0?(fm[fSteps[i-1].key]||0):0;
    var drop=(i>0&&prev>0)?Math.round((1-count\/prev)*100):null;
    var ofTotal=visitors>0?Math.round(count\/visitors*100):0;
    if(drop!==null&&drop>0)h+='<div class="a-drop">−'+drop+'% de drop<\/div>';
    h+='<div class="a-funnel-step">';
    h+='<div class="a-funnel-num'+(count>0?' on':'')+'">'+( i+1)+'<\/div>';
    h+='<div class="a-funnel-bar-wrap"><div class="a-funnel-bar'+(count===0?' off':'')+'" style="width:'+pct+'%"><\/div><\/div>';
    h+='<div class="a-funnel-info"><span class="a-funnel-n">'+fmt(count)+'<\/span>'+(visitors>0?'<span class="a-funnel-pct">'+ofTotal+'%<\/span>':'')+'<\/div>';
    h+='<\/div>';
    h+='<div class="a-funnel-lbl">'+esc(step.label)+'<\/div>';
  });
  h+='<\/div>';

  h+='<div class="a-card">';
  h+='<div class="a-card-title">Observations<\/div>';
  h+='<div class="a-insight-list">';
  if(visitors===0){
    h+='<div class="a-insight"><div class="a-dot n"><\/div><div class="a-insight-body"><div class="a-insight-txt">Aucun visiteur sur cette période. Le tracking est actif dès la prochaine visite.<\/div><\/div><\/div>';
  }else{
    if(insPct>=20){
      h+='<div class="a-insight"><div class="a-dot g"><\/div><div class="a-insight-body"><div class="a-insight-txt"><strong>'+insPct+'%</strong> des visiteurs accèdent à la page inscription, bon taux d&#39;engagement.<\/div><\/div><\/div>';
    }else if(insPct>0){
      h+='<div class="a-insight"><div class="a-dot y"><\/div><div class="a-insight-body"><div class="a-insight-txt">Seulement <strong>'+insPct+'%</strong> des visiteurs cliquent sur S&#39;inscrire. Le CTA est peut-être trop bas.<\/div><a class="a-insight-act" href="/" target="_blank">Voir la landing<\/a><\/div><\/div>';
    }else{
      h+='<div class="a-insight"><div class="a-dot r"><\/div><div class="a-insight-body"><div class="a-insight-txt">Aucun visiteur n&#39;a cliqué sur S&#39;inscrire. Le bouton est-il visible ?<\/div><a class="a-insight-act" href="/" target="_blank">Voir la landing<\/a><\/div><\/div>';
    }
    if(payments===0&&inscriptions>0){
      var formStep=fm.form_submit||0;
      if(formStep>0){
        h+='<div class="a-insight"><div class="a-dot y"><\/div><div class="a-insight-body"><div class="a-insight-txt"><strong>'+fmt(formStep)+'</strong> personnes ont soumis le formulaire mais aucun paiement n&#39;a abouti.<\/div><a class="a-insight-act" href="/inscription" target="_blank">Tester le paiement<\/a><\/div><\/div>';
      }else{
        h+='<div class="a-insight"><div class="a-dot n"><\/div><div class="a-insight-body"><div class="a-insight-txt">Le formulaire n&#39;a pas encore été soumis, pas assez de trafic pour mesurer la friction.<\/div><\/div><\/div>';
      }
    }
    if(payments>0){
      h+='<div class="a-insight"><div class="a-dot g"><\/div><div class="a-insight-body"><div class="a-insight-txt"><strong>'+fmt(payments)+'</strong> abonnement'+(payments>1?'s':'')+'  payé'+(payments>1?'s':'')+','+revenueImplied+' de revenu.<\/div><\/div><\/div>';
    }
    var mobRows=(byDim.device||[]).filter(function(r){return r.val==='mobile';});
    var mobN=mobRows.length?mobRows[0].sessions:0;
    var mobPct=visitors>0?Math.round(mobN\/visitors*100):0;
    if(mobPct>=40){
      h+='<div class="a-insight"><div class="a-dot y"><\/div><div class="a-insight-body"><div class="a-insight-txt"><strong>'+mobPct+'%</strong> des visites viennent de mobile. Tester l&#39;inscription sur smartphone.<\/div><a class="a-insight-act" href="/inscription" target="_blank">Tester sur mobile<\/a><\/div><\/div>';
    }
    var realFormErrors=formErrors.filter(function(e){return e.detail!=='turnstile';}).reduce(function(s, e ){return s+e.n;},0 );
    if(realFormErrors>0){
      h+='<div class="a-insight"><div class="a-dot r"><\/div><div class="a-insight-body"><div class="a-insight-txt"><strong>'+fmt(realFormErrors)+'</strong> erreur'+(realFormErrors>1?'s':'')+' bloquante'+(realFormErrors>1?'s':'')+' sur le formulaire (hors anti-bot). Voir le détail ci-dessous.<\/div><\/div><\/div>';
    }
    var otherRow=(byDim.referrer||[]).find(function(r){return r.val==='other';});
    var otherConv=(data.conv_perf||[]).find(function(r){return r.dim==='source'&&r.val==='other';});
    if(otherConv&&otherConv.visits>0&&otherConv.payments>0){
      var otherPct=Math.round(otherConv.payments/otherConv.visits*100);
      if(otherPct>=10){
        h+='<div class="a-insight"><div class="a-dot y"><\/div><div class="a-insight-body"><div class="a-insight-txt">Source "Autre" : <strong>'+otherPct+'% de conversion</strong> sur '+fmt(otherConv.visits)+' visites. Probablement du trafic interne ou des liens très qualifiés, � � exclure des métriques réelles.<\/div><\/div><\/div>';
      }
    }
  }
  h+='<\/div><\/div>';

  h+='<\/div>';

  var devRows=[].concat(byDim.device||[], byDim.browser||[]).sort(function(a, b ){return b.sessions-a.sessions;});
  h+='<div class="a-attr3">';
  h+=renderAttrCard('Sources de trafic', byDim.referrer||[], referrerLabel);
  h+=renderAttrCard('Pays', byDim.country||[], countryLabel);
  h+=renderAttrCard('Appareils & Nav.', devRows, function(v){return deviceLabel(v)||v;});
  h+='<\/div>';

  h+='<div class="a-charts">';
  h+='<div class="a-chart-card"><div class="a-chart-title">Visiteurs par jour<\/div>'+renderDailyChart(daily)+'<\/div>';
  h+='<div class="a-chart-card"><div class="a-chart-title">Heures de visite (UTC)<\/div>'+renderHourlyChart(hourly)+'<\/div>';
  h+='<\/div>';

  if(formErrors.length||payErrors.length){
    h+='<div class="a-card" style="margin-bottom:12px"><div class="a-card-title">Points de friction<\/div><div class="a-errors">';
    if(formErrors.length)h+=renderErrorCard('Erreurs formulaire', formErrors, fieldLabel, totalFormErrors);
    if(payErrors.length)h+=renderErrorCard('Erreurs paiement', payErrors, function(v){return v;}, totalPayErrors);
    h+='<\/div><\/div>';
  }

  h+=renderDiagnostic(data);

  document.getElementById('analytics-body').innerHTML=h;
}

function renderDailyChart(daily){
  if(!daily.length)return '<div style="font-size:11px;color:var(--muted);padding:16px 0;text-align:center">Pas encore de données<\/div>';
  var max=Math.max.apply(null, daily.map(function(d){return d.n;}).concat([1]));
  var s='<div class="a-bar-chart">';
  daily.forEach(function(d){
    var bh=Math.max(2, Math.round(d.n\/max*55));
    var label=d.key?String(d.key).slice(5):'';
    s+='<div class="a-bar-col"><div class="a-bar-fill" style="height:'+bh+'px" title="'+esc(d.key||'')+': '+fmt(d.n)+' visiteurs"><\/div><div class="a-bar-lbl">'+esc(label)+'<\/div><\/div>';
  });
  s+='<\/div>';
  return s;
}

function renderHourlyChart(hourly){
  if(!hourly.length)return '<div style="font-size:11px;color:var(--muted);padding:16px 0;text-align:center">Pas encore de données<\/div>';
  var filled=[];
  for(var h=0;h<24;h++){
    var found=null;
    for(var i=0;i<hourly.length;i++){if(parseInt(hourly[i].key,10)===h){found=hourly[i];break;}}
    filled.push({hour:h, n :found?found.n:0});
  }
  var max=Math.max.apply(null, filled.map(function(d){return d.n;}).concat([1]));
  var s='<div class="a-hourly">';
  filled.forEach(function(d){
    var bh=Math.max(2, Math.round(d.n\/max*45));
    var hh=String(d.hour).length<2?'0'+d.hour:String(d.hour);
    s+='<div class="a-h-bar" style="height:'+bh+'px" title="'+hh+'h: '+fmt(d.n)+' visites"><\/div>';
  });
  s+='<\/div>';
  s+='<div style="display:flex;justify-content:space-between;font-size:9px;color:var(--muted);margin-top:4px"><span>0h<\/span><span>6h<\/span><span>12h<\/span><span>18h<\/span><span>23h<\/span><\/div>';
  return s;
}

function renderAttrCard(title, rows, labelFn){
  var total=rows.reduce(function(s, r ){return s+r.sessions;},0 )||1;
  var s='<div class="a-attr-card"><div class="a-attr-card-title">'+esc(title)+'<\/div>';
  if(!rows.length){s+='<div style="font-size:11px;color:var(--muted)">Aucune donnée<\/div>';s+='<\/div>';return s;}
  rows.slice(0,7 ).forEach(function(r){
    var pct=Math.round(r.sessions\/total*100);
    s+='<div class="a-attr-row">';
    s+='<span class="a-attr-lbl">'+esc(labelFn(r.val))+'<\/span>';
    s+='<span class="a-attr-bar-bg"><span class="a-attr-bar-fill" style="width:'+pct+'%"><\/span><\/span>';
    s+='<span class="a-attr-pct">'+pct+'%<\/span>';
    s+='<span class="a-attr-n">'+fmt(r.sessions)+'<\/span>';
    s+='<\/div>';
  });
  s+='<\/div>';
  return s;
}

function renderErrorCard(title, errors, labelFn, total){
  var max=errors[0]?errors[0].n:1;
  var s='<div><div class="a-card-title" style="margin-bottom:8px">'+esc(title)+' <span style="font-weight:400;text-transform:none;font-size:11px;color:var(--muted)">('+fmt(total)+' total)<\/span><\/div>';
  s+='<table class="error-table"><tbody>';
  errors.forEach(function(e){
    var pct=Math.round(e.n/max*100);
    s+='<tr><td class="error-field">'+esc(labelFn(e.detail))+'<\/td>';
    s+='<td><span class="error-bar-bg"><span class="error-bar-fill" style="width:'+pct+'%"><\/span><\/span><\/td>';
    s+='<td class="error-count">'+fmt(e.n)+'<\/td>';
    s+='<td style="font-size:10px;color:var(--muted)">'+(total>0?Math.round(e.n/total*100)+'%':'')+'<\/td><\/tr>';
  });
  s+='<\/tbody><\/table><\/div>';
  return s;
}

function renderDiagnostic(data){
  var convPerf=(data.conv_perf||[]);
  var recent=(data.recent||[]);
  var byDim={source:[], device:[]};
  convPerf.forEach(function(r){if(byDim[r.dim])byDim[r.dim].push(r);});

  function convPctBadge(visits, payments){
    if(!visits)return '<span class="a-conv-pct nil">—<\/span>';
    var p=Math.round(payments\/visits*100);
    var cls=p>=5?'hi':p>=1?'mid':'lo';
    return '<span class="a-conv-pct '+cls+'">'+p+'%<\/span>';
  }

  function convTable(rows, labelFn, colHdr){
    if(!rows.length)return '<div style="font-size:11px;color:var(--muted)">Aucune donnée<\/div>';
    var s='<table class="a-conv-table"><thead><tr><th>'+esc(colHdr)+'<\/th><th>Visites<\/th><th>Paiements<\/th><th>Conv.<\/th><\/tr><\/thead><tbody>';
    rows.forEach(function(r){
      s+='<tr><td>'+esc(labelFn(r.val))+'<\/td><td>'+fmt(r.visits)+'<\/td><td>'+fmt(r.payments)+'<\/td><td>'+convPctBadge(r.visits, r .payments)+'<\/td><\/tr>';
    });
    s+='<\/tbody><\/table>';
    return s;
  }

  var fm2={};
  (data.funnel||[]).forEach(function(r){fm2[r.step]=r.sessions||0;});
  var dropSteps=[
    {from:'landing', to:'inscription', label:'Landing → Inscription'},
    {from:'inscription', to:'payment_init', label:'Inscription → Paiement'},
    {from:'payment_init', to:'payment_done', label:'Paiement → Activation'}
  ];

  var evtCls={page_view:'pv', payment_completed:'pay', payment_initiated:'pay', form_error:'err', payment_error:'err', cta_click:'cta', scroll_depth:'cta', share_click:'cta'};

  var h='';
  h+='<hr class="a-diag-sep">';
  h+='<div class="a-diag-title">Diagnostic &amp; journal brut<\/div>';

  h+='<div class="a-diag2">';
  h+='<div class="a-card"><div class="a-attr-card-title">Conversion par source<\/div>';
  h+=convTable(byDim.source, referrerLabel,'Source');
  h+='<\/div>';
  h+='<div class="a-card"><div class="a-attr-card-title">Conversion par device<\/div>';
  h+=convTable(byDim.device, deviceLabel,'Device');
  h+='<\/div>';
  h+='<\/div>';

  h+='<div class="a-card" style="margin-bottom:12px">';
  h+='<div class="a-attr-card-title">Taux de passage entre étapes<\/div>';
  h+='<table class="a-conv-table"><thead><tr><th>Transition<\/th><th>Entrée<\/th><th>Sortie<\/th><th>Perdus<\/th><th>Passage<\/th><\/tr><\/thead><tbody>';
  dropSteps.forEach(function(step){
    var from=fm2[step.from]||0;
    var to=fm2[step.to]||0;
    var lost=Math.max(0, from-to);
    var passRate=from>0?Math.round(to\/from*100):0;
    var lostRate=from>0?Math.round(lost\/from*100):0;
    var cls=passRate>=50?'hi':passRate>=20?'mid':'lo';
    h+='<tr><td>'+esc(step.label)+'<\/td><td>'+fmt(from)+'<\/td><td>'+fmt(to)+'<\/td>';
    var lostTxt=lost>0?('-'+fmt(lost)+(from>0?' ('+lostRate+'%)':'')):'—';
    var lostCol=lost>0?'var(--red)':'var(--muted)';
    h+='<td style="color:'+lostCol+';font-family:var(--font-display);font-weight:600">'+lostTxt+'<\/td>';
    h+='<td>'+(from>0?'<span class="a-conv-pct '+cls+'">'+passRate+'%<\/span>':'<span class="a-conv-pct nil">—<\/span>')+'<\/td>';
    h+='<\/tr>';
  });
  h+='<\/tbody><\/table><\/div>';

  h+='<div class="a-card" style="margin-bottom:0">';
  h+='<div class="a-attr-card-title">Journal brut,50 derniers événements<\/div>';
  if(!recent.length){
    h+='<div style="font-size:11px;color:var(--muted);padding:8px 0">Aucun événement.<\/div>';
  } else {
    h+='<div class="a-log-scroll">';
    h+='<table class="a-log-table"><thead><tr><th>Heure (UTC)<\/th><th>Session<\/th><th>Événement<\/th><th>Page<\/th><th>Pays<\/th><th>Device<\/th><th>Source<\/th><th>Méta<\/th><\/tr><\/thead><tbody>';
    recent.forEach(function(e){
      var cls=evtCls[e.event_name]||'';
      h+='<tr>';
      h+='<td style="font-size:10px;color:var(--muted)">'+esc(e.created_at?String(e.created_at).slice(5,16):'')+'<\/td>';
      h+='<td><span class="a-log-sid">'+esc((e.session_id||'').slice(0,8))+'<\/span><\/td>';
      h+='<td><span class="a-log-evt '+cls+'">'+esc(e.event_name||'')+'<\/span><\/td>';
      h+='<td style="color:var(--muted)">'+esc(e.page||'')+'<\/td>';
      h+='<td>'+esc(e.country||'')+'<\/td>';
      h+='<td>'+esc(deviceLabel(e.device||''))+'<\/td>';
      h+='<td>'+esc(referrerLabel(e.referrer_type||''))+'<\/td>';
      h+='<td style="color:var(--muted);font-size:10px">'+esc(e.metadata?String(e.metadata).slice(0,30):'')+'<\/td>';
      h+='<\/tr>';
    });
    h+='<\/tbody><\/table><\/div>';
  }
  h+='<\/div>';

  return h;
}

/* ── END ANALYTICS ──────────────────────────────────────────────────── */

function timeAgo(dateStr){
  const diff=Math.max(0, Date.now()-new Date(dateStr).getTime());
  const s=Math.floor(diff/1000);
  if(s<60)return 'il y a '+s+'s';
  const m=Math.floor(s/60);
  if(m<60)return 'il y a '+m+' min';
  const h=Math.floor(m/60);
  if(h<24)return 'il y a '+h+'h'+String(m%60).padStart(2,'0');
  return 'il y a '+Math.floor(h/24)+'j';
}

function fmtDate(dateStr){
  return new Date(dateStr).toLocaleString('fr-FR',{day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'});
}

const STATE_CFG={
  closed:{label:'Fermé', sub:'Surveillance active, site non ouvert', css:'closed'},
  watching:{label:'Surveillance', sub:'Marqueur absent, routes 404', css:'watching'},
  pre_open:{label:'Pré-ouverture', sub:'Détectée, attente 2e check', css:'pre_open'},
  open_notified:{label:'OUVERT', sub:'Abonnés notifiés', css:'open_notified'}
};

document.getElementById('secret-input').addEventListener('keydown', e =>{if(e.key==='Enter')authenticate()});

function showDashboard(data){
  document.getElementById('auth-screen').style.display='none';
  const dash=document.getElementById('dashboard');
  dash.style.display='flex';dash.style.flexDirection='column';
  renderStats(data.stats||{});
  renderSubscribers(data.subscribers||[]);
  loadStatus();
}

function logout(){
  fetch('/admin/logout',{method:'POST'});
  _analyticsLoaded=false;
  document.getElementById('dashboard').style.display='none';
  document.getElementById('auth-screen').style.display='flex';
  document.getElementById('secret-input').value='';
}

async function authenticate(){
  const btn=document.getElementById('auth-btn');
  btn.innerHTML='Chargement…';btn.disabled=true;
  const secret=document.getElementById('secret-input').value.trim();
  document.getElementById('auth-error').style.display='none';
  try{
    const loginRes=await fetch('/admin/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({secret})});
    if(!loginRes.ok){
      document.getElementById('auth-error').style.display='block';
      btn.innerHTML='Accéder <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      btn.disabled=false;return;
    }
    const res=await fetch('/admin/subscribers');
    const data=await res.json();
    showDashboard(data);
  }catch(e){showToast('Erreur réseau','red');}
  btn.innerHTML='Accéder <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  btn.disabled=false;
}

(async function autoLogin(){
  try{
    const res=await fetch('/admin/subscribers');
    if(!res.ok)return;
    const data=await res.json();
    showDashboard(data);
  }catch(e){}
})();

async function loadData(){
  const btn=document.getElementById('refresh-btn');
  if(btn)btn.style.opacity='.5';
  const [subsRes]=await Promise.all([
    fetch('/admin/subscribers'),
    loadStatus()
  ]);
  if(btn)btn.style.opacity='1';
  if(!subsRes.ok)return;
  const data=await subsRes.json();
  renderStats(data.stats||{});
  renderSubscribers(data.subscribers||[]);
}

async function loadStatus(){
  try{
    const res=await fetch('/status');
    if(!res.ok)return;
    const s=await res.json();
    const state=s.state||'closed';
    const cfg=STATE_CFG[state]||STATE_CFG.closed;

    document.getElementById('s-dot').className='s-dot '+cfg.css;
    document.getElementById('s-text').textContent=cfg.label+','+cfg.sub;

    const badge=document.getElementById('s-badge');
    badge.textContent=cfg.label;
    badge.className='status-state-badge '+cfg.css;
    badge.style.display='inline-block';

    if(s.lastRun){
      const lr=s.lastRun;
      document.getElementById('meta-time').textContent=lr.startedAt?fmtDate(lr.startedAt):'—';
      document.getElementById('meta-result').textContent=lr.fetchError?'⚠ Erreur réseau':'✓ OK';
      document.getElementById('meta-bytes').textContent=lr.htmlLength?(fmt(lr.htmlLength)+' octets'):'—';
      document.getElementById('meta-marker').textContent=
        lr.markerFound===true?'✗ Présent (fermé)':
        lr.markerFound===false?'✓ Absent':'—';
    }

    const govPill=document.getElementById('gov-pill');
    s.govSignalActive?govPill.classList.remove('inactive'):govPill.classList.add('inactive');

    renderRoutePills(s.routeStatuses||{});
    renderHistory(s.history||[]);
  }catch{}
}

function renderRoutePills(routeStatuses){
  const container=document.getElementById('route-pills-container');
  const entries=Object.entries(routeStatuses);
  if(!entries.length){container.innerHTML='<span style="font-size:12px;color:var(--muted)">Aucune donnée</span>';return;}
  const count200=entries.filter(([, v ])=>{const st=(v&&typeof v==='object')?v.status:v;return st===200;}).length;
  const summary=document.getElementById('routes-summary');
  if(summary)summary.textContent=count200+'/'+entries.length+' en 200';
  container.innerHTML=entries.map(([route, raw])=>{
    const status=(raw&&typeof raw==='object')?raw.status:raw;
    const sc=status===200?'s200':status===404?'s404':'serr';
    const label=status==null?'ERR':String(status);
    const short=route.replace(/^https?:\\/\\/[^/]+/,'');
    return '<div class="route-item"><span class="route-name">'+esc(short)+'</span><span class="route-status '+sc+'">'+esc(label)+'</span></div>';
  }).join('');
}

function renderHistory(history){
  const card=document.getElementById('history-card');
  const container=document.getElementById('history-container');
  const items=history.slice(0,20);
  if(!items.length){card.style.display='none';return;}
  card.style.display='block';
  document.getElementById('history-count').textContent=items.length+' dernier'+(items.length!==1?'s':'');
  const rows=items.map(h=>{
    const cfg=STATE_CFG[h.state]||STATE_CFG.closed;
    const ts=h.timestamp||h.ts;
    const marker=h.markerPresent;
    let r200=0, rtot=0;
    const rs=h.routeStatuses||h.routes;
    if(rs){const vals=Object.values(rs);rtot=vals.length;r200=vals.filter(v=>(v&&typeof v==='object')?v.status===200:v===200).length;}
    const bytes=h.htmlLength?fmt(h.htmlLength)+' o':'—';
    return '<tr>'+
      '<td title="'+(ts?fmtDate(ts):'')+'">'+esc(ts?timeAgo(ts):'-')+'</td>'+
      '<td><span class="h-badge '+cfg.css+'">'+esc(h.state||'-')+'</span></td>'+
      '<td class="col-marker">'+(marker===true?'<span class="marker-nok">✗</span>':marker===false?'<span class="marker-ok">✓</span>':'—')+'</td>'+
      '<td>'+r200+'/'+rtot+' × 200</td>'+
      '<td class="col-bytes">'+bytes+'</td>'+
      '</tr>';
  }).join('');
  container.innerHTML='<div style="overflow-x:auto"><table class="history-table"><thead><tr>'+
    '<th>Quand</th><th>État</th><th class="col-marker">Marqueur</th><th>Routes</th><th class="col-bytes">Taille</th>'+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>';
}

function renderStats(stats){
  document.getElementById('s-total').textContent=fmt(stats.total||0);
  document.getElementById('s-confirmed').textContent=fmt(stats.confirmed||0);
  document.getElementById('s-pending').textContent=fmt(stats.pending||0);
  document.getElementById('s-unsub').textContent=fmt(stats.unsubscribed||0);
}

function renderSubscribers(subs){
  const n=subs.length;
  document.getElementById('table-count').textContent=n+' abonné'+(n!==1?'s':'');
  if(!n){
    document.getElementById('table-container').innerHTML=
      '<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-title">Aucun abonné</div><div class="empty-sub">Les inscriptions apparaîtront ici dès que des personnes rejoindront le service.</div></div>';
    return;
  }
  const rows=subs.map(s=>{
    const name=[esc(s.first_name), esc(s.last_name)].filter(Boolean).join(' ')||'—';
    const d=s.created_at?new Date(s.created_at).toLocaleDateString('fr-FR'):'—';
    const smsIcon=s.sms_consent?'<span class="sms-yes">✓</span>':'<span class="sms-no">—</span>';
    return '<tr>'+
      '<td title="'+name+'">'+name+'</td>'+
      '<td title="'+esc(s.email||'')+'">'+esc(s.email||'—')+'</td>'+
      '<td class="col-phone">'+esc(s.phone||'—')+'</td>'+
      '<td class="col-sms">'+smsIcon+'</td>'+
      '<td><span class="badge badge-'+esc(s.status||'')+'">'+esc(s.status||'?')+'</span></td>'+
      '<td class="col-date">'+d+'</td>'+
      '</tr>';
  }).join('');

  const cards=subs.map(s=>{
    const name=[esc(s.first_name), esc(s.last_name)].filter(Boolean).join(' ')||'—';
    const d=s.created_at?new Date(s.created_at).toLocaleDateString('fr-FR'):'—';
    return '<div class="sub-card">'+
      '<div class="sub-card-name">'+name+'</div>'+
      '<div class="sub-card-email">'+esc(s.email||'—')+'</div>'+
      '<div class="sub-card-row">'+
        '<span class="badge badge-'+esc(s.status||'')+'">'+esc(s.status||'?')+'</span>'+
        (s.phone?'<span class="sub-card-phone">'+esc(s.phone)+'</span>':'')+
        (s.sms_consent?'<span class="sub-card-phone" style="color:var(--green)">SMS ✓</span>':'')+
        '<span class="sub-card-phone">'+d+'</span>'+
      '</div>'+
      '</div>';
  }).join('');

  document.getElementById('table-container').innerHTML=
    '<div style="overflow-x:auto"><table class="subs-table"><thead><tr>'+
    '<th>Nom</th><th>Email</th><th class="col-phone">Téléphone</th><th class="col-sms">SMS</th><th>Statut</th><th class="col-date">Inscrit le</th>'+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>'+
    '<div class="sub-cards">'+cards+'</div>';
}

async function runCheck(){
  if(!confirm('Lancer une vérification manuelle ?'))return;
  showToast('Vérification en cours…');
  try{
    const res=await fetch('/check');
    const data=await res.json();
    document.getElementById('check-result-body').textContent=JSON.stringify(data, null,2);
    document.getElementById('check-result-panel').classList.add('visible');
    showToast(res.ok?'✓ Vérification terminée':'✗ Erreur', res.ok?'green':'red');
    if(res.ok)setTimeout(loadData,600);
  }catch{showToast('✗ Erreur réseau','red');}
}

async function runAction(path, msg){
  if(!confirm(msg))return;
  try{
    const res=await fetch(path);
    const data=await res.json();
    showToast(res.ok?'✓ '+(data.message||'OK'):'✗ Erreur', res.ok?'green':'red');
    if(res.ok&&path!=='/test-notify')setTimeout(loadData,600);
  }catch{showToast('✗ Erreur réseau','red');}
}

function showToast(msg, type){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.className='toast'+(type?' '+type:'');
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove('show'),4000);
}

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
</script>
</div>
</body>
</html>`;
}
