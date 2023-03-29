import React from "react";
import AdvLayout from "../../Components/adv-layout";
import styles from "@/styles/add-campaign.module.scss";
import { useState, useEffect } from "react";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import Swirl from "../../artifacts/contracts/Swirl.sol/Swirl.json";
import { Web3Storage } from "web3.storage";

const Swirl_address = "0x2682ae42cD8B09a0e94dE4f050aB81A86dc8C296";

function AddCampaign() {
  const [campaignData, setCampaginData] = useState({
    campaignName: null,
    campaignBudget: null,
    campaignPpckick: null,
    contentCid: null,
  });
  const db = new Polybase({
    defaultNamespace:
      "pk/0x3dd0a82b180d872bf79edd4659c433f1a0165028da146e710a74d542f8217eaf31e842c710e1607da901443668a3821a84aaefe62200f250b4bed12b16e871ca/Advertise",
  });
  const collectionReference = db.collection("Advertise");
  const updateData = async () => {
    const uniqueId = Math.random().toString(36).substring(2);
    const recordData = await collectionReference.create([
      uniqueId,
      address,
      cid,
    ]);
    console.log(recordData);
  };

  const getData = async () => {
    const { data } = await collectionReference.record("tt14gns8zl").get();
    console.log(data);
  };
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
        if (chainId === 80001) {
          const contract = new ethers.Contract(
            Swirl_address,
            Swirl.abi,
            signer
          );
          return contract;
        } else {
          alert("Please connect to the polygon Mumbai testnet Network!");
        }
      }
      console.log(signer);
    } catch (error) {
      console.log(error);
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
        0,

        campaignData.campaignPpckick,
        cid
      );
      await tx.wait();
      updateData();

      console.log(tx);
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
          <button onClick={() => uploadCampaign()} className={ styles.btn }>upload Campaign</button>
        </div>
      </div>
    </AdvLayout>
  );
}

export default AddCampaign;
