import NextCors from "nextjs-cors";
import { connectToDatabase } from "./mongodb";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method === "PUT") {
    const { db } = await connectToDatabase();
    const collection = db.collection("campaigns");

    const campaignId = req.query.campaignId;
    const clicks = req.body.clicks;
    const impressions = req.body.impressions;
    const reward = req.body.reward;

    try {
      const result = await collection.updateOne(
        { campaignId: campaignId },
        { $set: { clicks, impressions, reward } }
      );

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Campaign updated successfully" });
      } else {
        res.status(404).json({ error: "Campaign not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating campaign" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
