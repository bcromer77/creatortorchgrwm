export default async function handler(req, res) {
  const { event, data } = req.body;
  if (event === 'live_stream_started') {
    liveStreamDB.push({
      channel_id: data.channel_id,
      platform: data.platform,
      timestamp: data.timestamp
    });
  }
  res.status(200).send('Received');
}
