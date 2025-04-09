export default async function handler(req, res) {
    const { url } = req.query;
  
    if (!url) return res.status(400).json({ error: "Missing URL" });
  
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  }
  