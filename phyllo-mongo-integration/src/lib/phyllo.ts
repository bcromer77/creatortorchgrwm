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

export async function getAllWorkPlatforms() {
  const res = await fetch(`${BASE_URL}/work-platforms`, {
    headers: authHeader()
  });

  return await res.json();
}

export async function getProfileEngagement(profileId: string) {
  const res = await fetch(`${BASE_URL}/profiles/${profileId}/engagement`, {
    headers: authHeader()
  });

  return await res.json();
}
