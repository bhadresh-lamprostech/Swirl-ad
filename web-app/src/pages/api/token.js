const { connectToDatabase } = require("./mongodb");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const collection = db.collection("tokens");

    const walletAddress = req.body.walletAddress;
    const category = req.body.category;

    if (!walletAddress) {
      res.status(400).json({ error: "Missing wallet address" });
      return;
    }

    if (!category) {
      res.status(400).json({ error: "Missing category" });
      return;
    }

    const existingToken = await collection.findOne({ walletAddress });

    if (existingToken) {
      res.status(409).json({
        error: "Token already exists for this wallet address",
        token: existingToken.token,
      });
      return;
    }

    const token = generateToken();

    try {
      await collection.insertOne({ walletAddress, token, category, clicks: 0, amount: 0.0, insights: 0 });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error inserting token into database" });
    }
  } else if (req.method === "GET") {
    const { db } = await connectToDatabase();
    const collection = db.collection("tokens");

    const { walletAddress, token } = req.query;

    const existingToken = await collection.findOne(
      { walletAddress, token },
      { projection: { _id: 0 } }
    );

    if (existingToken) {
      res.status(200).json({ verified: true });
    } else {
      res.status(401).json({ verified: false });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

function generateToken() {
  const crypto = require("crypto");
  return crypto.randomBytes(32).toString("hex");
}
