export default async function handler(req, res) {
  const { email } = JSON.parse(req.body);
  const auth = Buffer.from(`${process.env.PHYLLO_CLIENT_ID}:${process.env.PHYLLO_CLIENT_SECRET}`).toString('base64');

  const userRes = await fetch('https://api.staging.getphyllo.com/v1/users', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: email.split('@')[0],
      external_id: `CT-${Date.now()}`
    })
  });
  const userData = await userRes.json();
  const userId = userData.id;

  const tokenRes = await fetch('https://api.staging.getphyllo.com/v1/sdk-tokens', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: userId,
      products: ['CONTENT', 'ENGAGEMENT', 'IDENTITY', 'AUDIENCE']
    })
  });
  const tokenData = await tokenRes.json();

  res.status(200).json({ userId, sdkToken: tokenData.sdk_token });
}
