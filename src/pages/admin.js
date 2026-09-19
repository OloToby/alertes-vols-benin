export function adminPage() {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin | Alertes Vols Bénin</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23008751'/%3E%3Ctext x='16' y='24' text-anchor='middle' font-size='22'%3E✈%3C/text%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root{
      --deep:#1B2B3C;--accent:#e8112d;--bg:#F8F6F1;--bg2:#FFFFFF;
      --muted:#667888;--line:rgba(27,43,60,0.10);
      --green:#008751;--green-light:#e8f5ee;--green-mid:rgba(0,135,81,0.12);
      --yellow:#FCD116;--yellow-light:#fef9e7;
      --red:#E8112D;--red-light:#fde8eb;
      --orange:#E67E22;--orange-light:#fdf0e6;
      --font-display:'Sora',ui-sans-serif,system-ui,sans-serif;
      --font-body:'Inter',ui-sans-serif,system-ui,sans-serif;
      --radius:12px;--shadow:0 2px 8px rgba(27,43,60,0.07);
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body{height:100%;font-family:var(--font-body);background:var(--bg);color:var(--deep);-webkit-font-smoothing:antialiased}

    /* ── AUTH ── */
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
    .auth-btn:active{transform:translateY(0)}
    .auth-error{display:none;margin-top:14px;font-size:13px;color:#ff8a8a;text-align:center;padding:10px;background:rgba(232,17,45,0.12);border-radius:8px;border:1px solid rgba(232,17,45,0.2)}

    /* ── LAYOUT ── */
    #dashboard{display:none;min-height:100vh;flex-direction:column}

    /* ── HEADER ── */
    .dash-header{background:var(--green);padding:0 clamp(14px,3vw,28px);height:54px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)}
    .dash-brand{display:inline-flex;align-items:center;gap:8px;text-decoration:none;min-width:0}
    .dash-brand-icon{width:30px;height:30px;border-radius:7px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.22);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
    .dash-wordmark{font-family:var(--font-display);font-size:14px;font-weight:600;color:rgba(255,255,255,0.92);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .dash-flag{width:26px;height:18px;border-radius:3px;overflow:hidden;display:grid;grid-template-columns:2fr 3fr;grid-template-rows:1fr 1fr;box-shadow:0 0 0 1px rgba(255,255,255,0.25);flex-shrink:0}
    .dash-flag span:nth-child(1){grid-row:1/3;background:#008751}
    .dash-flag span:nth-child(2){background:#FCD116}
    .dash-flag span:nth-child(3){background:#E8112D}
    .header-right{display:flex;align-items:center;gap:8px}
    .hbtn{padding:6px 12px;border-radius:7px;font-size:12px;font-weight:600;font-family:var(--font-body);cursor:pointer;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.10);color:#fff;transition:background .15s;white-space:nowrap;display:inline-flex;align-items:center;gap:5px}
    .hbtn:hover{background:rgba(255,255,255,0.22)}
    .hbtn.danger{border-color:rgba(232,17,45,0.5);background:rgba(232,17,45,0.15);color:#ffb3bb}
    .hbtn.danger:hover{background:rgba(232,17,45,0.30)}
    .hbtn svg{flex-shrink:0}

    /* ── BODY ── */
    .dash-body{flex:1;padding:clamp(14px,2.5vw,24px) clamp(14px,3vw,28px);max-width:1280px;margin:0 auto;width:100%}

    /* ── SECTION LABEL ── */
    .sec-label{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.09em;margin-bottom:8px}

    /* ── STATS GRID ── */
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px}
    .stat-card{background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);padding:16px 18px;box-shadow:var(--shadow);transition:box-shadow .2s}
    .stat-card:hover{box-shadow:0 4px 16px rgba(27,43,60,0.11)}
    .stat-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
    .stat-lbl{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.09em}
    .stat-ico{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;background:rgba(27,43,60,0.06)}
    .stat-card.c-confirmed .stat-ico{background:var(--green-light)}
    .stat-card.c-pending .stat-ico{background:var(--yellow-light)}
    .stat-card.c-unsub .stat-ico{background:rgba(102,120,136,0.08)}
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
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}
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
    .refresh-btn{padding:5px 11px;font-size:11px;font-weight:600;font-family:var(--font-body);background:var(--bg);border:1px solid var(--line);border-radius:7px;cursor:pointer;color:var(--muted);transition:background .15s,color .15s;display:inline-flex;align-items:center;gap:4px}
    .refresh-btn:hover{background:#eceae5;color:var(--deep)}

    /* ROUTES CARD */
    .routes-card{padding:16px 18px}
    .routes-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}
    .route-item{display:flex;align-items:center;justify-content:space-between;background:var(--bg);border-radius:8px;padding:7px 10px;gap:6px}
    .route-name{font-size:11px;font-weight:500;color:var(--deep);font-family:'SF Mono',Menlo,monospace;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .route-status{font-size:11px;font-weight:700;padding:1px 7px;border-radius:999px;flex-shrink:0}
    .route-status.s200{background:var(--green-light);color:var(--green)}
    .route-status.s404{background:var(--red-light);color:var(--red)}
    .route-status.serr{background:rgba(102,120,136,0.1);color:var(--muted)}

    /* ── CHECK RESULT ── */
    .check-result-panel{display:none;background:var(--bg2);border:1px solid var(--line);border-radius:var(--radius);margin-bottom:16px;box-shadow:var(--shadow);overflow:hidden}
    .check-result-panel.visible{display:block}
    .check-result-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--line);background:var(--bg)}
    .check-result-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--muted)}
    .check-result-close{background:none;border:none;font-size:18px;cursor:pointer;color:var(--muted);padding:2px 6px;border-radius:4px;line-height:1}
    .check-result-close:hover{background:var(--line);color:var(--deep)}
    .check-result-body{padding:14px 16px;font-size:12px;font-family:'SF Mono',SFMono-Regular,Consolas,Menlo,monospace;line-height:1.6;overflow-x:auto;white-space:pre-wrap;word-break:break-word;color:var(--deep);max-height:280px;overflow-y:auto}

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
    .toast{position:fixed;bottom:20px;right:20px;background:var(--deep);color:#fff;padding:11px 16px;border-radius:10px;font-size:13px;font-weight:500;transform:translateY(80px);opacity:0;transition:all .3s;z-index:9999;max-width:320px;line-height:1.5;box-shadow:0 8px 24px rgba(0,0,0,0.25)}
    .toast.green{background:var(--green)}
    .toast.red{background:var(--red)}
    .toast.show{transform:translateY(0);opacity:1}

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
    }
    @media(max-width:680px){
      .stats-grid{grid-template-columns:1fr 1fr}
      .routes-grid{grid-template-columns:1fr 1fr}
      .col-phone,.col-sms,.col-date{display:none}
      .dash-wordmark{display:none}
    }
    @media(max-width:480px){
      .stats-grid{grid-template-columns:1fr 1fr}
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
      <div class="auth-logo-icon">✈</div>
      <span class="auth-logo-text">Alertes Vols Bénin</span>
    </div>
    <div class="flag-stripe"><div></div><div></div><div></div></div>
    <p class="auth-title">Dashboard Admin</p>
    <p class="auth-sub">Accès restreint — administrateurs uniquement</p>
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
  <header class="dash-header">
    <a href="/" class="dash-brand">
      <span class="dash-brand-icon">✈</span>
      <span class="dash-wordmark">Admin · Alertes Vols Bénin</span>
    </a>
    <div class="header-right">
      <button class="hbtn" onclick="runCheck()" title="Vérifier maintenant">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2z" stroke="currentColor" stroke-width="1.6"/><path d="M8 5v3.5l2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        <span>Vérifier</span>
      </button>
      <button class="hbtn" onclick="runAction('/test-notify','Envoyer une notification de test ?')" title="Test email + SMS">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 5 6-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/></svg>
        <span>Test notif</span>
      </button>
      <button class="hbtn danger" onclick="runAction('/reset','Réarmer la surveillance ?')" title="Réarmer">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M13 2.5A6 6 0 1 1 7 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7 2l2-2M7 2l2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>Réarmer</span>
      </button>
      <span class="dash-flag"><span></span><span></span><span></span></span>
    </div>
  </header>

  <div class="dash-body">

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

  </div>

  <footer class="dash-footer">
    <p>Service d'alerte pour les vols spéciaux Paris‑Cotonou via <a href="https://www.voyage.benin.bj/" target="_blank" rel="noopener">voyage.benin.bj</a>.<br>Non affilié à Bénin Tours S.A. ni au Gouvernement du Bénin.</p>
    <div class="footer-bar"><span></span><span></span><span></span></div>
  </footer>
</div>

<div class="toast" id="toast"></div>

<script>
let secret='';

function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

function fmt(n){return Number(n).toLocaleString('fr-FR')}

function timeAgo(dateStr){
  const diff=Math.max(0,Date.now()-new Date(dateStr).getTime());
  const s=Math.floor(diff/1000);
  if(s<60)return 'il y a '+s+'s';
  const m=Math.floor(s/60);
  if(m<60)return 'il y a '+m+' min';
  const h=Math.floor(m/60);
  if(h<24)return 'il y a '+h+'h'+String(m%60).padStart(2,'0');
  return 'il y a '+Math.floor(h/24)+'j';
}

function fmtDate(dateStr){
  return new Date(dateStr).toLocaleString('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
}

const STATE_CFG={
  closed:{label:'Fermé',sub:'Surveillance active — site non ouvert',css:'closed'},
  watching:{label:'Surveillance',sub:'Marqueur absent, routes 404',css:'watching'},
  pre_open:{label:'Pré-ouverture',sub:'Détectée — attente 2e check',css:'pre_open'},
  open_notified:{label:'OUVERT',sub:'Abonnés notifiés',css:'open_notified'}
};

document.getElementById('secret-input').addEventListener('keydown',e=>{if(e.key==='Enter')authenticate()});

async function authenticate(){
  const btn=document.getElementById('auth-btn');
  btn.innerHTML='Chargement…';btn.disabled=true;
  secret=document.getElementById('secret-input').value.trim();
  document.getElementById('auth-error').style.display='none';
  try{
    const res=await fetch('/admin/subscribers',{headers:{Authorization:'Bearer '+secret}});
    if(res.status===401){
      document.getElementById('auth-error').style.display='block';
      btn.innerHTML='Accéder <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      btn.disabled=false;return;
    }
    const data=await res.json();
    document.getElementById('auth-screen').style.display='none';
    const dash=document.getElementById('dashboard');
    dash.style.display='flex';dash.style.flexDirection='column';
    renderStats(data.stats||{});
    renderSubscribers(data.subscribers||[]);
    await loadStatus();
  }catch(e){showToast('Erreur réseau','red');}
  btn.innerHTML='Accéder <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  btn.disabled=false;
}

async function loadData(){
  const btn=document.getElementById('refresh-btn');
  if(btn)btn.style.opacity='.5';
  const [subsRes]=await Promise.all([
    fetch('/admin/subscribers',{headers:{Authorization:'Bearer '+secret}}),
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
    document.getElementById('s-text').textContent=cfg.label+' — '+cfg.sub;

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
  const count200=entries.filter(([,v])=>{const st=(v&&typeof v==='object')?v.status:v;return st===200;}).length;
  const summary=document.getElementById('routes-summary');
  if(summary)summary.textContent=count200+'/'+entries.length+' en 200';
  container.innerHTML=entries.map(([route,raw])=>{
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
    let r200=0,rtot=0;
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
    const name=[esc(s.first_name),esc(s.last_name)].filter(Boolean).join(' ')||'—';
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
    const name=[esc(s.first_name),esc(s.last_name)].filter(Boolean).join(' ')||'—';
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
    const res=await fetch('/check',{headers:{Authorization:'Bearer '+secret}});
    const data=await res.json();
    document.getElementById('check-result-body').textContent=JSON.stringify(data,null,2);
    document.getElementById('check-result-panel').classList.add('visible');
    showToast(res.ok?'✓ Vérification terminée':'✗ Erreur',res.ok?'green':'red');
    if(res.ok)setTimeout(loadData,600);
  }catch{showToast('✗ Erreur réseau','red');}
}

async function runAction(path,msg){
  if(!confirm(msg))return;
  try{
    const res=await fetch(path,{headers:{Authorization:'Bearer '+secret}});
    const data=await res.json();
    showToast(res.ok?'✓ '+(data.message||'OK'):'✗ Erreur',res.ok?'green':'red');
    if(res.ok&&path!=='/test-notify')setTimeout(loadData,600);
  }catch{showToast('✗ Erreur réseau','red');}
}

function showToast(msg,type){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.className='toast'+(type?' '+type:'');
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove('show'),4000);
}
</script>
</div>
</body>
</html>`;
}
