const { connectToDatabase } = require("./mongodb");
const { v4: uuidv4 } = require("uuid");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const collection = db.collection("campaigns");
    // const campaignId = req.body.campaignId;
    const advertiserId = req.body.advertiserId;
    const balance = Number(req.body.budget);
    const campaignName = req.body.campaignName;
    const budget = Number(req.body.budget);
    const category = req.body.category;
    const campaignUrl = req.body.campaignUrl;
    const payclick = Number(req.body.payclick);
    const stringCID = req.body.stringCID;
    const isActive = true;

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
        campaignUrl,
        insights: 0,
        isActive
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
