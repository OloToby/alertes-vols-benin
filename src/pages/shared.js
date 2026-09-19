import { escapeHtml } from "../notify.js";

export function shareFabHtml(shareUrl) {
  const waText = encodeURIComponent("Sois alerté dès que les vols Paris-Cotonou s'ouvrent sur voyage.benin.bj, les places partent en quelques minutes ! 👉 " + shareUrl);
  const fbUrl = encodeURIComponent(shareUrl);
  return `<div class="share-fab" id="shareFab">
  <button class="fab-toggle" onclick="document.getElementById('shareFab').classList.toggle('open')" aria-label="Partager">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
  </button>
  <div class="fab-menu">
    <a href="https://wa.me/?text=${waText}" class="fab-item wa" target="_blank" rel="noopener" aria-label="Partager sur WhatsApp">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=${fbUrl}" class="fab-item fb" target="_blank" rel="noopener" aria-label="Partager sur Facebook">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    </a>
    <button class="fab-item cp" onclick="navigator.clipboard.writeText('${shareUrl}');this.innerHTML='✓';setTimeout(()=>this.innerHTML='<svg width=\\'16\\' height=\\'16\\' viewBox=\\'0 0 24 24\\' fill=\\'#fff\\'><path d=\\'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z\\'/></svg>',1200)" aria-label="Copier le lien">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
    </button>
  </div>
</div>
<style>
.share-fab{position:fixed;bottom:24px;right:24px;z-index:900;display:flex;flex-direction:column-reverse;align-items:center;gap:10px}
.fab-toggle{width:52px;height:52px;border-radius:50%;background:var(--flag-green,#008751);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,0.25);transition:transform .2s,background .2s}
.fab-toggle:hover{background:#006640;transform:scale(1.05)}
.share-fab.open .fab-toggle{transform:rotate(45deg);background:#006640}
.fab-menu{display:flex;flex-direction:column-reverse;gap:8px;opacity:0;transform:translateY(10px) scale(0.8);pointer-events:none;transition:opacity .2s,transform .2s}
.share-fab.open .fab-menu{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
.fab-item{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;border:none;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,0.2);transition:transform .15s;font-size:16px;color:#fff;font-weight:700}
.fab-item:hover{transform:scale(1.1)}
.fab-item.wa{background:#25D366}
.fab-item.fb{background:#1877F2}
.fab-item.cp{background:var(--deep,#1B2B3C)}
</style>`;
}

export function pageShell(title, content) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | Alertes Vols Bénin</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23008751'/%3E%3Ctext x='16' y='24' text-anchor='middle' font-size='22'%3E✈%3C/text%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root{--deep:#1B2B3C;--accent:#e8112d;--bg:#F8F6F1;--bg2:#FFFFFF;--muted:#667888;--line:rgba(27,43,60,0.10);--flag-green:#008751;--flag-yellow:#FCD116;--flag-red:#E8112D;--font-display:'Sora',ui-sans-serif,system-ui,sans-serif;--font-body:'Inter',ui-sans-serif,system-ui,sans-serif}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{font-family:var(--font-body);background:var(--bg);color:var(--deep);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .card{background:var(--bg2);border-radius:16px;padding:40px 36px;max-width:480px;width:100%;box-shadow:0 2px 24px var(--line);border:1px solid var(--line)}
    .flag-stripe{display:flex;height:4px;border-radius:2px;overflow:hidden;margin-bottom:28px}
    .flag-stripe div:nth-child(1){flex:1;background:var(--flag-green)}
    .flag-stripe div:nth-child(2){flex:2;background:var(--flag-yellow)}
    .flag-stripe div:nth-child(3){flex:1;background:var(--flag-red)}
    h2{font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--deep);margin-bottom:12px;letter-spacing:-0.3px}
    .msg{color:var(--muted);font-size:16px;line-height:1.7}.msg strong{color:var(--deep)}.msg a{color:var(--accent)}
    a{color:var(--accent)}
    .home{display:block;text-align:center;margin-top:24px;color:var(--muted);font-size:14px;text-decoration:none}.home:hover{color:var(--deep)}

</style>
</head>
<body>
  <div class="card">
    <div class="flag-stripe"><div></div><div></div><div></div></div>
    ${content}
  </div>
</body>
</html>`;
}
