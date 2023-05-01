const { connectToDatabase } = require("./mongodb");


export default async function handler(req, res) {
    if (req.method === "GET") {
        const { campaignId, publisherId } = req.body;
        console.log(campaignId);
        console.log(publisherId);
        if (!campaignId || !publisherId) {
            res.status(498).json({ message: "Please pass a token" });
        }
        const { db } = await connectToDatabase();
        try {
            const campaignCollection = await db.collection("campaigns").findOne({ campaignId: campaignId });
            const tokenCollection = await db.collection("tokens").findOne({
                token: publisherId
            })
            // console.log(campaignCollection);
            if (campaignCollection && tokenCollection) {
                const reducedAmount = campaignCollection.balance - campaignCollection.payclick;
                const campaignUpdate = await db.collection("campaigns").updateOne(
                    { campaignId: campaignCollection.campaignId },
                    {
                        $set: { insights: campaignCollection.insights + 1 }
                    }
                )
                console.log(campaignUpdate)

                if (reducedAmount <= 0) {
                    const changeCampaignStatus = await db.collection("campaigns").updateOne(
                        { campaignId: campaignCollection.campaignId },
                        {
                            $set: { isActive: false }
                        }
                    )

                    if (changeCampaignStatus.acknowledged) {
                        res.status(200).json({
                            message: "Don't have sufficient fund."
                        })
                    }
                }

                if (tokenCollection) {
                    const tokenUpdate = await db.collection("tokens").updateOne(
                        { token: tokenCollection.token },
                        {
                            $set: { insights: tokenCollection.insights + 1 }
                        }
                    )

                    console.log(tokenUpdate);

                    if (campaignUpdate.acknowledged && tokenUpdate.acknowledged) {
                        res.status(200).json({ message: "Insights recorded successfully" })
                    }
                } else {
                    res.status(404).send("No token found");
                }

                // const addClickAndFund = await 
                // res.status(200).json({ message: "Data fetched", data: campaignCollection })
            } else {
                res.status(404).send("No data found");
            }
        } catch (e) {
            console.log(e);
            res.status(500).send("Internal server error");
        }
    }
}