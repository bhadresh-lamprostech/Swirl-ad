import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Swirl from "../../artifacts/contracts/Swirl.sol/Swirl.json";
import styles from "../../styles/all-campaign.module.scss";

const Swirl_address = "0xCbf927f2B289B5F35Abc34202887a68AE7109209";

function AllCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const getContract = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          if (!provider) {
            console.log("Metamask is not installed, please install!");
          }
          const { chainId } = await provider.getNetwork();
          console.log("switch case for this case is: " + chainId);
          if (chainId === 1029) {
            const contract = new ethers.Contract(
              Swirl_address,
              Swirl.abi,
              signer
            );
            const campaignsData = await contract.getAllCampaigns();

            const formattedCampaignsData = campaignsData.map((campaign) => {
              return {
                ...campaign,
                balance: ethers.utils.formatEther(campaign.balance || 0),
                budget: ethers.utils.formatEther(campaign.budget || 0),
                payclick: campaign.payclick || 0,
              };
            });

            setCampaigns(formattedCampaignsData);
          } else {
            alert("Please connect to the BTTC Testnet testnet Network!");
          }
        }
        console.log(signer);
      } catch (error) {
        console.log(error);
      }
    };
    getContract();
  }, []);

  return (
    <div className={styles.grid}>
      {campaigns.map((campaign) => (
        <div className={styles.card} key={campaign.campaignName}>
          <img
            src={"https://" + `${campaign.stringCID}` + ".ipfs.w3s.link"}
            alt="Campaign Image"
            className={styles.image}
          />
          <div className={styles.details}>
            <p>Balance: {campaign.balance} Matic</p>
            <p>Budget: {campaign.budget} Matic</p>
            <p>Pay per Click: {campaign.payclick} Matic</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllCampaigns;
