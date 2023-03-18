import styles from "@/styles/Onboard.module.scss";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ethers } from "ethers";
import Swirl from "../../artifacts/contracts/Swirl.sol/Swirl.json";

const Swirl_address = "0xaC4561e17A72e4a059b98A9E034Ee502E1F6F6ba";

export default function onBoard() {
  const { isConnected, address } = useAccount();
  const Route = useRouter();

  useEffect(() => {
    if (!isConnected) Route.push("/");
  }, [isConnected]);

  // const createAdv = new.ethers.Contract(Swirl_address, Swirl.abi, signer)

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
  // console.log(address)

  const createAdv = async () => {
    try {
      console.log(address);
      const contract = await getContract();
      const tx = await contract.createAdvertiser(address);
      await tx.wait();
      console.log(tx);
      Route.push("/adv-form");
    } catch (error) {
      console.log(error);
    }
  };

  const createPub = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.createPublisher(address);
      await tx.wait();
      console.log(tx);
    } catch (error) {
      Route.push("/pub-form");
    }
  };

  return (
    <>
      <div className={styles.onboardMain}>
        <h1 className={styles.onboardHeader}>
          SELECT THE DOMAIN THAT SUITS YOU &#128578;
        </h1>
        <div className={styles.onboardInner}>
          <div className={styles.left}>
            <div
              className={styles.advCard}
              onClick={() => {
                // Route.push("/adv-form");
                createAdv();
              }}
            >
              ADVERTISER
            </div>
          </div>
          <div className={styles.right}>
            <div
              className={styles.pubCard}
              onClick={() => {
                // Route.push("/pub-form");
                createPub();
              }}
            >
              PUBLISHER
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
