import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "./serverAddr";

export const Publisher = ({ token }) => {
  const [campaigns, setCampaigns] = useState([]);
  // const [clickCount, setClickCount] = useState(0);
  const [lastClick, setLastClick] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      // const response = await axios.get(
      //   `${server}/campaignbytoken`,headers:{"Content-Type": "application/json"}
      // );

      let data = JSON.stringify({
        "token": token
      });
      
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${server}/campaignbytoken`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setCampaigns(response.data.campaigns);
      })
      .catch((error) => {
        console.log(error);
      });
    };
    if(token){
      fetchCampaigns();
      if(campaigns.campaignId){
        let data = JSON.stringify({
          "publisherId": token,
          "campaignId": campaigns.campaignId
        });
        
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${server}/updateinsights`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          console.log("Insights recorded");
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
      }  
    }
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
    let data = JSON.stringify({
      "publisherId": token,
      "campaignId": campaigns.campaignId
    });
    
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${server}/updateuserclicks`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    try {
      const response = await axios.request(config);
      console.log(response.data);
      setLastClick({ ipAddress: ipAddress, timestamp: new Date() });
      window.open(campaigns.campaignUrl,"_blank");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {
        loading
        ?
          <h1>Loading...</h1>
        :
        <div className="campaign-list">
          {campaigns.length > 0 ? 
            (
              <img
                src={"https://" + `${campaigns.stringCID}` + ".ipfs.w3s.link"}
                alt={campaigns[0].campaignName}
                onClick={()=>{handleClick()}}
              />
            )
            :
            <h1>No Ads available</h1>
          }
        </div>
      }
    </>
  );
};
