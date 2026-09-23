// Session ID : SHA-256(IP + YYYY-MM-DD + sel quotidien KV) tronqué à 12 hex chars
// Méthode identique à Plausible — non réversible même avec accès complet au hash.
// Reset quotidien : impossible de corréler deux jours consécutifs.
async function sessionId(request, kv) {
  const ip  = request.headers.get('CF-Connecting-IP') || 'unknown';
  const day = new Date().toISOString().slice(0, 10);
  const kvKey = 'analytics:salt:' + day;
  let salt = kv ? await kv.get(kvKey) : null;
  if (!salt) {
    salt = crypto.randomUUID();
    if (kv) await kv.put(kvKey, salt, { expirationTtl: 172800 }); // 48h — couvre le jour + buffer
  }
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${ip}:${day}:${salt}`));
  return Array.from(new Uint8Array(buf)).slice(0, 6).map(b => b.toString(16).padStart(2, '0')).join('');
}

function device(ua) {
  if (!ua) return 'unknown';
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return 'mobile';
  return 'desktop';
}

function browser(ua) {
  if (!ua) return 'unknown';
  if (/Edg\//i.test(ua))        return 'Edge';
  if (/OPR\/|Opera\//i.test(ua)) return 'Opera';
  if (/Firefox\//i.test(ua))    return 'Firefox';
  if (/Chrome\//i.test(ua))     return 'Chrome';
  if (/Safari\//i.test(ua))     return 'Safari';
  return 'Other';
}

function referrerType(ref) {
  if (!ref) return 'direct';
  if (/wa\.me|whatsapp/i.test(ref))          return 'whatsapp';
  if (/facebook\.com|fb\.me|m\.facebook/i.test(ref)) return 'facebook';
  if (/instagram\.com/i.test(ref))           return 'instagram';
  if (/google\./i.test(ref))                 return 'google';
  if (/twitter\.com|t\.co/i.test(ref))       return 'twitter';
  if (/youtube\.com/i.test(ref))             return 'youtube';
  if (/tiktok\.com/i.test(ref))              return 'tiktok';
  return 'other';
}

// env remplace db en premier argument — donne accès à env.DB et env.STATE (sel KV)
export async function trackEvent(env, request, eventName, metadata = null) {
  if (!env?.DB) return;
  try {
    const ua  = request.headers.get('User-Agent') || '';
    const ref = request.headers.get('Referer')    || '';
    await env.DB.prepare(
      `INSERT INTO analytics_events
         (session_id, event_name, page, metadata, country, device, browser, referrer_type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      await sessionId(request, env.STATE),
      eventName,
      new URL(request.url).pathname,
      metadata ? JSON.stringify(metadata) : null,
      request.headers.get('CF-IPCountry') || 'XX',
      device(ua),
      browser(ua),
      referrerType(ref)
    ).run();
  } catch (err) {
    console.warn('analytics.trackEvent:', err?.message);
  }
}
