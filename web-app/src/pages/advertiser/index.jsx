import styles from "@/styles/Advertiser.module.scss";
import AdvLayout from "./adv-layout";
// import advertiserData from "@/dummy/advertiserData.json";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Swirl from "../../artifacts/contracts/Swirl.sol/Swirl.json";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Swirl_address = "0x2682ae42cD8B09a0e94dE4f050aB81A86dc8C296";

export default function Advertiser() {
  const { address } = useAccount();
  const [depositeFund, setDepositeFund] = useState({
    fund: null,
  });

  const [matic, setMatic] = useState();
  const [selectedCampaign, setSelectedCampaign] = useState('Campaign A');
  const [mounted, setMounted] = useState(false);

  const campaignsData = [
    { name: 'Campaign A', Impressions: 12000, Clicks: 800, Conversions: 120 },
    { name: 'Campaign B', Impressions: 8000, Clicks: 500, Conversions: 80 },
    { name: 'Campaign C', Impressions: 6000, Clicks: 400, Conversions: 60 },
  ];
  

  const data = campaignsData.map((campaign) => {
    return {
      name: campaign.name,
      Impressions: campaign.Impressions,
      Clicks: campaign.Clicks,
      Conversions: campaign.Conversions
    }
  });

  const txSuccess = () => toast.success("hurray.. deposite success");

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

  useEffect(() => {
    console.log(depositeFund);
  }, [depositeFund]);

  // console.log(address);
  useEffect(() => {
    getAdvBal();
    setMounted(true);
  }, []);
  const exceptThisSymbols = ["e", "E", "+", "-"];

  // console.log(advertiserData);
  const depositeBtn = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.deposit(address, {
        value: ethers.utils.parseEther(depositeFund.fund.toString()),
      });
      await tx.wait();
      txSuccess();
      getAdvBal();

      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdvBal = async () => {
    const contract = await getContract();
    console.log(contract);
    const getAdv = await contract.getAdvertiserBalance(address);

    console.log(getAdv);
    // console.log(ethers.utils.parseEther(getAdv.toString()));
    console.log(parseInt(getAdv));
    // console.log(
    //   parseInt(ethers.utils.parseUnits(parseInt(getAdv).toString(), "ether"))
    // );
    setMatic(ethers.utils.formatUnits(getAdv));
  };

  if (!mounted) return null
  return (
    <AdvLayout>
      <div className={styles.dashboardMain}>
        <div className={styles.topBox}>
          <label className={styles.Header}>INSIGHTS</label>
          <div className={styles.inner}>
            <div className={styles.card}>
              <div className={styles.title}>Total Locked</div>
              <div className={styles.value}>{matic} Matic</div>
              <div>
                <Popup
                  trigger={<button> Deposite</button>}
                  position="top center"
                >
                  <div>
                    <lable for="deposite" style={{ color: "black" }}>
                      Enter Deposite Amount:
                    </lable>
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
                        setDepositeFund({
                          ...depositeFund,
                          fund: e.target.value,
                        });
                      }}
                    />
                    <button onClick={() => depositeBtn()}>Deposite</button>
                  </div>
                </Popup>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.title}>Total Ads. Published</div>
              <div className={styles.value}>400</div>
            </div>
            <div className={styles.card}>
              <div className={styles.title}>Total Spent</div>
              <div className={styles.value}>80 Matic</div>
            </div>
          </div>
        </div>
        <div className={styles.graphBox}>
          {/* <motion.div
            className={styles.campaignGraphContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex' }}
          > */}
            <div className={styles.campaignsList}>
              {campaignsData.map((campaign) => (
                <motion.div
                  key={campaign.name}
                  className={ selectedCampaign === campaign.name ? styles.active : styles.inActive}
                  onClick={() => setSelectedCampaign(campaign.name)}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {campaign.name}
                </motion.div>
              ))}
            </div>
            <div className={styles.graphContainer}>
              <BarChart
                width={600}
                height={300}
                data={[data.find((d) => d.name === selectedCampaign)]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Impressions" fill="#4C7CFF" animationBegin={0} animationDuration={1500} />
                <Bar dataKey="Clicks" fill="#2E9AFE" animationBegin={0} animationDuration={1500} />
                <Bar dataKey="Conversions" fill="#0000FF" animationBegin={0} animationDuration={1500} />
              </BarChart>
            </div>
          {/* </motion.div> */}
        </div>

        <ToastContainer
          ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        ></ToastContainer>
      </div>
    </AdvLayout>
  );
}
