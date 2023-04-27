import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import Swirl from "../../artifacts/contracts/Swirl.sol/Swirl.json";
import styles from "../../styles/profile.module.scss";
import AdvLayout from "@/Components/AdvLayout";

const Swirl_address = "0xCbf927f2B289B5F35Abc34202887a68AE7109209";

const Profile = () => {
    const { address } = useAccount();
    const [data, setData] = useState({
        balance: "",
        orgUsername: "",
        orgname: "",
        orgLogo: "",
        orgdiscription: "",
        orgOrigin: "",
        empstrength: "",
        orgFounder: "",
        orgCatagory: "",
    });

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

    const callProfile = async () => {
        try {
            const contract = await getContract();
            const tx = await contract.getAdvertiser(address);
            setData({
                balance: ethers.utils.formatEther(tx[2]),
                orgUsername: tx[3],
                orgname: tx[4],
                orgLogo: tx[5],
                orgdiscription: tx[6],
                orgOrigin: tx[7],
                empstrength: tx[8],
                orgFounder: tx[9],
                orgCatagory: tx[10],
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        callProfile();
    }, []);

    return (
        <AdvLayout>
            <div className={styles.pcontainer}>
                <div className={styles.profile}>
                    <div className={styles.header}>
                        <img
                            src={"https://" + `${data.orgLogo}` + ".ipfs.w3s.link"}
                            alt={`${data.orgname} Logo`}
                        />
                        <h2>{data.orgUsername}</h2>
                        <h1>{data.orgname}</h1>
                        <p>{data.orgdiscription}</p>
                    </div>
                    <div className={styles.aboutS}>
                        <div className={styles.info}>
                            <h2>About {data.orgname}</h2>
                            <p>{data.orgdiscription}</p>
                            <p>
                                Founded by {data.orgFounder} in {data.orgOrigin}
                            </p>
                            <p>Category: {data.orgCatagory}</p>
                            <p>Number of employees: {data.empstrength}</p>
                        </div>
                        <div className={styles.balanceA}>
                            <h2>Balance</h2>
                            <p>{data.balance}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdvLayout>
    );
};

export default Profile;
