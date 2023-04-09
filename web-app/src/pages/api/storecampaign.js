const { connectToDatabase } = require("./mongodb");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const collection = db.collection("campaigns");

    const advertiserId = req.body.advertiserId;
    const balance = req.body.balance;
    const campaignName = req.body.campaignName;
    const budget = req.body.budget;
    const payclick = req.body.payclick;
    const stringCID = req.body.stringCID;

    try {
      await collection.insertOne({
        advertiserId,
        balance,
        campaignName,
        budget,
        payclick,
        stringCID,
      });
      res.status(200).json({ message: "Campaign created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating campaign" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
