import { verifyMessage } from "ethers/lib/utils";
import { NextApiHandler } from "next";

const api: NextApiHandler = async (req, res) => {
  // Insert API endpoint logic here
  const { message, signature } = req.body;
  const address = verifyMessage(message, signature);
  return res.json({ address });
};

export default api;
