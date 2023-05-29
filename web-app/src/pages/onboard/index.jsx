import styles from "@/styles/Onboard.module.scss";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";
import Swirl from "../../artifacts/contracts/Swirl.sol/Swirl.json";
const Swirl_address = "0xbAfFe333fb9D5d5bb51875C7910240c705ADB3c0";

export default function Onboard() {
  const { isConnected, address } = useAccount();
  const Route = useRouter();

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
        if (chainId === 199) {
          const contract = new ethers.Contract(
            Swirl_address,
            Swirl.abi,
            signer
          );
          return contract;
        } else {
          alert("Please connect to the BTTC Network!");
        }
      }
      console.log(contract);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isConnected) Route.push("/");
  }, [isConnected]);

  //checks if user already registerd as a advertiser if yes then redirected on advertisers page
  useEffect(() => {
    (async () => {
      const contract = await getContract();
      console.log(contract);
      const getAdv = await contract.getAdvertiser(address);
      console.log(getAdv);
      if (getAdv[1] === address) {
        Route.push("/advertiser");
      } else {
        null;
      }
      console.log(getAdv);

    })();
  }, []);

  //checks if user already registerd as a Publisher if yes then redirected on publishers page
  useEffect(() => {
    (async () => {
      const contract = await getContract();
      const getPub = await contract.getPublisher(address);
      if (getPub[1] === address) {
        Route.push("/publisher");
      } else {
        null;
      }
      console.log(getPub);
    })();
  }, []);

  return (
    <>
      <div className={styles.onboardMain}>
        <div className={styles.onboardOuter}>
          <h1 className={styles.onboardHeader}>
            SELECT THE DOMAIN THAT SUITS YOU &#128578;
          </h1>
          <div className={styles.onboardInner}>
            <div className={styles.left}>
              <div
                className={styles.advCard}
                onClick={() => {
                  Route.push("/adv-form");
                }}
              >
                ADVERTISER
              </div>
            </div>
            <div className={styles.right}>
              <div
                className={styles.pubCard}
                onClick={() => {
                  Route.push("/pub-form");
                }}
              >
                PUBLISHER
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
