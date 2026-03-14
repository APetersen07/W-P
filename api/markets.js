export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=20');

  try {
    const r = await fetch(
      'https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=50&order=volume24hr&ascending=false',
      { headers: { 'Accept': 'application/json', 'User-Agent': 'Sentinel/1.0' } }
    );
    if (!r.ok) return res.status(502).json({ error: 'Polymarket API fejlede' });
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
