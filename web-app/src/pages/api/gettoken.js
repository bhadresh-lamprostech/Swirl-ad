const { connectToDatabase } = require("./mongodb");
const { MongoClient } = require("mongodb");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { db } = await connectToDatabase();
    const collection = db.collection("tokens");

    const { walletAddress } = req.query;

    if (!walletAddress) {
      res.status(400).json({ error: "Missing wallet address" });
      return;
    }

    const existingToken = await collection.findOne({ walletAddress });

    if (existingToken) {
      res.status(200).json({ token: existingToken.token });
    } else {
      res
        .status(404)
        .json({ error: "Token not found for this wallet address" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
