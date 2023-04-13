import React, { useState, useEffect } from "react";
import axios from "axios";

const CampaignList = ({ token }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [lastClick, setLastClick] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/campaignbytoken?token=${token}`
      );
      setCampaigns(response.data.campaigns);
    };
    fetchCampaigns();
  }, [token]);

  const handleClick = async () => {
    // Get user's IP address
    const response = await axios.get("https://api.ipify.org/?format=json");
    const ipAddress = response.data.ip;

    // Check if IP address has clicked in the last minute
    if (lastClick && lastClick.ipAddress === ipAddress) {
      const now = new Date();
      const lastClickTime = new Date(lastClick.timestamp);
      const diff = (now.getTime() - lastClickTime.getTime()) / 1000; // difference in seconds

      if (diff < 60) {
        console.log("User has already clicked within the last minute");
        return;
      }
    }

    // Update click count and timestamp
    const data = JSON.stringify({
      clicks: clickCount + 1,
      impressions: 0,
      reward: 0,
      lastClick: {
        ipAddress: ipAddress,
        timestamp: new Date(),
      },
    });
    setClickCount(clickCount + 1);

    const config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/updatecampaign?campaignId=${campaigns[1].campaignId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(response.data);
      setLastClick({ ipAddress: ipAddress, timestamp: new Date() });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="campaign-list">
      {campaigns.length > 0 && (
        <img
          src={"https://" + `${campaigns.stringCID}` + ".ipfs.w3s.link"}
          alt={campaigns[0].campaignName}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default CampaignList;
