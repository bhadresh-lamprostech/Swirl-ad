// client/src/components/GetCampaigns.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/getcampaigns.module.scss";

function GetCampaigns() {
  const [campaign, setCampaign] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await axios.get(
          "https://swirl-ad.vercel.app/api/getcampaign"
        );
        console.log(response.data.campaigns);
        // for (let i = 0; i < response.data.campaigns; i++) {
        //   campaigns.push(response.data.campaigns[i]);
        // }
        setCampaign(response.data.campaigns);
      } catch (err) {
        console.log(err);
      }
    }

    fetchCampaigns();
  }, []);

  return (
    <div className={styles.gridContainer}>
      {campaign.length > 0 &&
        campaign.map((i) => (
          <div key={i._id} className={styles.gridCard}>
            <div className={styles.imageContainer}>
              <img
                className={styles.cmpimg}
                src={"https://" + `${i?.stringCID}` + ".ipfs.w3s.link"}
                alt={i?.campaignName}
              />
              {/* src={"https://" + `${campaign.stringCID}` + ".ipfs.w3s.link"} */}
            </div>
            <div className={styles.detailsContainer}>
              <h2 className={styles.campaignName}>{i?.campaignName}</h2>
              <p className={styles.advertiserId}>
                Advertiser ID: {i?.advertiserId}
              </p>
              <p className={styles.balance}>Balance: ${i?.balance}</p>
              <p className={styles.budget}>Budget: ${i?.budget}</p>
              <p className={styles.payclick}>Pay Per Click: ${i?.payclick}</p>
              <p className={styles.clicks}>Clicks: {i?.clicks}</p>
              <p className={styles.impressions}>
                Impressions: {i?.impressions}
              </p>
              <p className={styles.reward}>Reward: ${i?.reward}</p>
            </div>
          </div>
        ))}
      {campaign.length === 0 && <p>No campaigns found.</p>}
    </div>
  );
}

export default GetCampaigns;
