export async function handleDiasporaSearchLog(request, env) {
  try {
    const { query, resultCount } = await request.json();
    const q = (query || '').trim().slice(0, 200);
    if (!q || resultCount !== 0) return new Response('ok', { status: 200 });
    await env.DB.prepare(
      'INSERT INTO diaspora_searches (query, result_count) VALUES (?, ?)'
    ).bind(q, 0).run();
  } catch {}
  return new Response('ok', { status: 200 });
}

export async function handleDiasporaSearchStats(request, env) {
  const { results } = await env.DB.prepare(`
    SELECT query, COUNT(*) as count, MAX(created_at) as last_at
    FROM diaspora_searches
    GROUP BY query
    ORDER BY count DESC
    LIMIT 100
  `).all();
  return new Response(JSON.stringify(results || []), {
    headers: { 'content-type': 'application/json' }
  });
}
