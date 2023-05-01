import { connectToDatabase } from "./mongodb";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {

  if (req.method === "GET") {
    const { db } = await connectToDatabase();
    const collection = db.collection("campaigns");

    try {
      const { token } = req.body;
      console.log(token);
      const tokenCollection = db.collection("tokens");
      console.log(tokenCollection);
      const existingToken = await tokenCollection.findOne({ token });
      console.log(existingToken);

      if (!existingToken) {
        res.status(404).json({ error: "Token not found" });
        return;
      }

      const campaigns = await collection
        .find({
          $and: [
            { category: existingToken.category },
            { category: { $exists: true, $ne: null } },
          ],
        })
        .toArray();
      console.log(campaigns);

      res.status(200).json({ campaigns });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error retrieving campaigns" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
