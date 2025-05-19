import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: 'Missing url parameter' });

  const apiUrl = `https://flexcoder.rf.gd/instagram/?url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const image = data.image ? `https://flexcoder.rf.gd/instagram/?id=${data.image}` : null;
    const video = data.video ? `https://flexcoder.rf.gd/instagram/?id=${data.video}` : null;

    res.status(200).json({ image, video });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
