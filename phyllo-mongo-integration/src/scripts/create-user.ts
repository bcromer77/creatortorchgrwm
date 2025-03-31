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

async function createUser() {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      name: 'Bazil Bazil',
      external_id: `Bazil-${Date.now()}`
    })
  });

  const data = await response.json();
  console.log('👤 User Created:', JSON.stringify(data, null, 2));
}

createUser();
