import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: 'Missing url parameter' });

  const apiUrl = `https://instagram-downloader-api-six.vercel.app/?url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: `API error: ${response.statusText}` });
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      return res.status(500).json({ error: 'Invalid JSON response from API', body: text });
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}
