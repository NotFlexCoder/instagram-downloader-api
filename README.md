# 📸 Instagram Downloader API

A lightweight Node.js (Next.js) API endpoint that extracts image and video URLs from public Instagram posts using the [FlexCoder Instagram Scraper](https://flexcoder.rf.gd/instagram/). Ideal for bots, media preview tools, or any project needing Instagram media without authentication!

## 🚀 Features

- 🔗 Fetch image and video links from public Instagram posts.
- ⚡ Simple and fast — works with a single URL parameter.
- 📦 Uses modern `async/await` syntax.
- 🧩 Easily integratable with Telegram bots, web frontends, and more.

## 🛠️ Requirements

- Node.js v14 or higher.
- A Next.js setup or any Node.js backend that supports API routes (e.g., Vercel, Netlify, Replit, etc.).

## 📡 Usage

1. **Setup**:
   - Create a file under `index.js` in your Next.js project.
   - Paste the following code:

     ```js
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
     ```

2. **Run Your Server**:
   ```bash
   npm run dev
   ```

3. **Access the API**:
   - Visit: `http://localhost:3000/?url=INSTAGRAM_POST_URL`
   - Example:

     ```json
     {
       "image": "https://flexcoder.rf.gd/instagram/?id=1234567890",
       "video": null
     }
     ```

## 📄 Example Response

```json
{
  "image": "https://flexcoder.rf.gd/instagram/?id=ABCDEF123",
  "video": "https://flexcoder.rf.gd/instagram/?id=GHIJKL456"
}
```

## ⚠️ Error Handling

- If no `url` parameter is provided, it returns a `400 Bad Request`:
  ```json
  {
    "error": "Missing url parameter"
  }
  ```
- If the fetch fails due to external issues, it returns a `500 Internal Server Error`:
  ```json
  {
    "error": "Failed to fetch data"
  }
  ```

## 📝 License

This project is licensed under the MIT License – see the [LICENSE](https://github.com/NotFlexCoder/instagram-downloader-api/blob/main/LICENSE) file for details.
