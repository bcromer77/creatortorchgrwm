export default async function handler(req, res) {
  const brief = JSON.parse(req.body);
  console.log('Brand signup:', brief);
  res.status(200).json({ success: true });
}
