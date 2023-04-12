const { connectToDatabase } = require("./mongodb");
const { v4: uuidv4 } = require("uuid");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const collection = db.collection("campaigns");

    const advertiserId = req.body.advertiserId;
    const balance = req.body.balance;
    const campaignName = req.body.campaignName;
    const budget = req.body.budget;
    const category = req.body.category;
    const payclick = req.body.payclick;
    const stringCID = req.body.stringCID;

    const campaignId = uuidv4(); // Generate a UUID for the campaign

    try {
      await collection.insertOne({
        campaignId, // Add campaignId to the document
        advertiserId,
        balance,
        campaignName,
        budget,
        category,
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
