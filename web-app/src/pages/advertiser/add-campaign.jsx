import React from "react";
import AdvLayout from "../../Components/AdvLayout";
import styles from "@/styles/add-campaign.module.scss";
import { useState, useEffect } from "react";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import axios from "axios";

import Swirl from "../../artifacts/contracts/Swirl.sol/Swirl.json";
import { Web3Storage } from "web3.storage";

const Swirl_address = "0x32158bdCEC4F45687365a6cC9F291635Daf8b32B";

function AddCampaign() {
  const [campaignData, setCampaginData] = useState({
    campaignName: null,
    campaignBudget: null,
    campaignPpckick: null,
    // contentCid: null,
    campaignCategory: null,
  });

  const { address } = useAccount();
  const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRDOGI5MDZiNUIyMjJFM2Y4MTUzRTI1OEE3OEFGNzZCQkU2NDdGYzgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzkxNjE1NzQ5NjYsIm5hbWUiOiJTd2lybCJ9.GmeMvijkrq0Pc24eHvrHNlwqCuVjCzJudWK4EAfY7Tk",
  });

  const [cid, setCid] = useState("");

  const exceptThisSymbols = ["e", "E", "+", "-"];
  useEffect(() => {
    console.log(campaignData);
  }, [campaignData]);

  useEffect(() => {
    if (campaignData.contentCid) {
      UploadImage();
    }
  }, [campaignData.contentCid]);

  async function UploadImage() {
    try {
      const fileInput = document.querySelector('input[type="file"]');
      const rootCid = await client.put(fileInput.files, {
        name: campaignData.contentCid.name,
        maxRetries: 3,
      });

      const res = await client.get(rootCid); // Web3Response
      const files = await res.files(campaignData.contentCid); // Web3File[]
      for (const file of files) {
        setCid(file.cid);
        console.log(file.cid);
      }
    } catch (e) {
      console.log(e);
    }
  }
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
          return contract;
        } else {
          alert("Please connect to the BTTC Testnet testnet Network!");
        }
      }
      console.log(signer);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadDb = async () => {
    const apiUrl = "http://localhost:3000/api/storecampaign";

    const data = JSON.stringify({
      advertiserId: address,
      // balance: 0,
      campaignName: campaignData.campaignName,
      budget: campaignData.campaignBudget,
      category: campaignData.campaignCategory,
      payclick: campaignData.campaignPpckick,
      stringCID: cid,
    });

    console.log(data);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      // handle success, if necessary
    } catch (error) {
      console.log(error);
      // handle error, if necessary
    }
  };
  const uploadCampaign = async () => {
    try {
      console.log(address);
      const contract = await getContract();
      const tx = await contract.createCampaign(
        address,
        ethers.utils.parseEther(campaignData.campaignBudget.toString()),
        campaignData.campaignName,
        campaignData.campaignCategory,
        campaignData.campaignPpckick,
        cid
      );
      await tx.wait();
      console.log(tx);
      uploadDb();
    } catch (error) {
      console.log(error);
    }
  };

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
              onChange={(e) => {
                setCampaginData({
                  ...campaignData,
                  campaignName: e.target.value,
                });
              }}
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
              onChange={(e) => {
                setCampaginData({
                  ...campaignData,
                  campaignBudget: e.target.value,
                });
              }}
              placeholder="eg.1, 0.1"
              name="name"
              required
            />
          </div>
          <div>
            <label>Category </label>
            <select
              id="category"
              name="category"
              required
              onChange={(e) => {
                setCampaginData({
                  ...campaignData,
                  campaignCategory: e.target.value,
                });
              }}
            >
              <option value="">--Select a Category--</option>
              <option value="commercial">Commercial</option>
              <option value="products">Products</option>
              <option value="entertainment">Entertainment</option>
              <option value="general awareness">General Awareness</option>
              <option value="promotion">Promotion</option>
            </select>
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
              onChange={(e) => {
                setCampaginData({
                  ...campaignData,
                  campaignPpckick: e.target.value,
                });
              }}
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
              onChange={(e) => {
                setCampaginData({
                  ...campaignData,
                  contentCid: e.target.value,
                });
              }}
            />
          </div>
          <button onClick={() => uploadCampaign()} className={styles.btn}>
            upload Campaign
          </button>
          {/* <button onClick={() => uploadDb()} className={styles.btn}>
            upload Campaign db
          </button> */}
        </div>
      </div>
    </AdvLayout>
  );
}

export default AddCampaign;
