const { connectToDatabase } = require("./mongodb");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { db } = await connectToDatabase();
    const collection = db.collection("campaigns");

    try {
      const campaigns = await collection.find().toArray();
      res.status(200).json({ campaigns });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error retrieving campaigns" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
