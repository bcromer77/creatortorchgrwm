export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const mockCreators = [
      {
        channel: "@KathleenLights",
        content: "GRWM: Clean Makeup Routine",
        country: "USA",
        thumbnail: "https://placehold.co/300x200",
        sentiment: "Positive",
        mentions: [
          {
            keyword: "Charlotte Tilbury brush",
            timestamp: "3:15",
            sentiment: "Positive"
          }
        ],
        liveStreams: [
          {
            platform: "TikTok",
            timestamp: "2025-03-31T15:00:00Z"
          }
        ],
        score: 35
      }
    ];

    res.status(200).json(mockCreators);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
