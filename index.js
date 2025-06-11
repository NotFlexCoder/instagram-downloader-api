import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing "url" query parameter' });
  }

  const apiUrl = `https://facebook-video.vercel.app/?url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(apiUrl);
    const contentType = response.headers.get("content-type") || "";

    // If the response is not OK or not JSON, return the raw body as text
    if (!response.ok || !contentType.includes("application/json")) {
      const body = await response.text();
      return res.status(response.status || 500).json({
        error: 'API did not return valid JSON',
        body
      });
    }

    // Parse JSON and return it directly to user
    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: 'Internal fetch error',
      details: error.message
    });
  }
}
