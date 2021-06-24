import { NextApiHandler } from 'next';

const api: NextApiHandler = async (req, res) => {
  // Insert API endpoint logic here

  return res.json({ example: 'ok' });
};

export default api;
