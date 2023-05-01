import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/PublishGenerateTokens.module.scss";
import PubLayout from "../../Components/PubLayout";
import { ethers } from "ethers";
import SwirlABI from "../../artifacts/contracts/Swirl.sol/Swirl.json";
import axios from "axios";
import { useAccount } from "wagmi";

const Swirl_address = "0xD0102c95fBa57bec725717b9341099dA114576C5";

function GenerateToken() {
  const { address } = useAccount();
  const [pubCatagory, setPubCatagory] = useState();
  const [userToken, setUserToken] = useState("");
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");
  const textRef = useRef(null);

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
            SwirlABI.abi,
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

  useEffect(() => {
    getPublisherCatagory();
  }, []);

  const getPublisherCatagory = async () => {
    const contract = await getContract();
    const getCatagory = await contract.getPublisher(address);

    setPubCatagory(getCatagory[9]);
  };

  const getToken = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/gettoken?walletAddress=${address}`,
      headers: {},
    };

    try {
      const response = await axios.request(config);
      setUserToken(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const generateToken = async () => {
    let data = JSON.stringify({
      walletAddress: address,
      category: pubCatagory,
    });

    let config = {
      method: "post",
      url: "http://localhost:3000/api/token",
      headers: {
        "Content-Type": "application/json",
      },
      maxContentLength: {
        maxBodyLength: Infinity,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      setUserToken(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };
  const copyText = async (e) => {
    try {
      await navigator.clipboard.writeText(textRef.current.textContent);
      setTooltipText("Copied! ✅");
    } catch (error) {
      console.error("Error copying text: ", error);
    }
  };

  const resetTooltip = () => {
    setTooltipText("Copy to clipboard");
  };

  return (
    <PubLayout>
      <div className={styles.genMain}>
        <div className={styles.genOuter}>
          <div className={styles.genHeader}>Generate Tokens</div>
          <div className={styles.genContent}>
            If you are looking to monetize your content, Project Swirl offers an
            innovative advertisement platform that can help increase your ad
            revenue. With our unique token system, you can easily integrate our
            advertisement package into your application, and gain access to
            powerful targeting and optimization tools. Sign up for our services
            today and start monetizing your content efficiently.
          </div>
          {userToken ? (
            <div className={styles.tokenmain}>
              <span className={styles.spantoken} ref={textRef}>
                {userToken}
              </span>
              <button
                id="copy"
                className={styles.tokenbtn}
                title={tooltipText}
                onClick={copyText}
                onMouseOver={resetTooltip}
              >
                Copy
              </button>
            </div>
          ) : (
            <button className={styles.genBtn} onClick={() => generateToken()}>
              Generate
            </button>
          )}
        </div>
      </div>
    </PubLayout>
  );
}

export default GenerateToken;
