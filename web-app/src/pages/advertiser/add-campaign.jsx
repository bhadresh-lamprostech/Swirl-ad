import React from "react";
import AdvLayout from "./adv-layout";
import styles from "@/styles/add-campaign.module.scss";
import { useState } from "react";
function AddCampaign() {

  const [campaignData, setCampaginData] = useState({
    
  })
  const exceptThisSymbols = ["e", "E", "+", "-"];

  return (
    <AdvLayout>
      <div className={styles.cpMain}>
        <h1 className={styles.cpHeading}>Add campaign</h1>
        <div className={styles.form}>
          <div>
            <label>Name </label>
            <input
              id="name"
              type="text"
              placeholder="eg.Crypto Advertisement"
              name="name"
              required
            />
          </div>

          <div>
            <label>Ad-Budget</label>
            <input
              id="name"
              type="number"
              step="0.1"
              min="0"
              max="20"
              onKeyDown={(e) =>
                exceptThisSymbols.includes(e.key) && e.preventDefault()
              }
              placeholder="eg.1, 0.1"
              name="name"
              required
            />
          </div>
          <div>
            <label>Pay-per-click</label>
            <input
              id="name"
              type="number"
              step="0.1"
              min="0"
              max="20"
              onKeyDown={(e) =>
                exceptThisSymbols.includes(e.key) && e.preventDefault()
              }
              placeholder="eg.1, 0.1"
              name="name"
              required
            />
          </div>
          <div>
            <label>upload Content</label>
            <input
              id="name"
              type="file"
              placeholder="Crypto Advertisement"
              name="name"
              required
            />
          </div>
        </div>
      </div>
    </AdvLayout>
  );
}

export default AddCampaign;
