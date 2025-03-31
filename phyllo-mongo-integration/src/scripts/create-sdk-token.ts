import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'https://api.staging.getphyllo.com/v1';

const authHeader = () => {
  const auth = Buffer.from(
    `${process.env.PHYLLO_CLIENT_ID}:${process.env.PHYLLO_CLIENT_SECRET}`
  ).toString('base64');

  return {
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/json'
  };
};

async function generateSdkToken() {
  const res = await fetch(`${BASE_URL}/sdk-tokens`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      user_id: "ff992afe-4d0c-4945-8007-066ae8dee632", // 👈 your actual user_id
      products: [
        "IDENTITY",
        "ENGAGEMENT",
        "ENGAGEMENT.AUDIENCE"
      ]
    })
  });

  const data = await res.json();
  console.log("🔐 SDK Token:", JSON.stringify(data, null, 2));
}

generateSdkToken();
