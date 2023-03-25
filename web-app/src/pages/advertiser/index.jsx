import styles from "@/styles/Advertiser.module.scss";
import AdvLayout from "./adv-layout";
// import advertiserData from "@/dummy/advertiserData.json";

export default function Advertiser() {

    // console.log(advertiserData);

    return (
        <AdvLayout>
            <div className={styles.dashboardMain}>
                <div className={styles.topBox}>
                    <label className={styles.Header}>INSIGHTS</label>
                    <div className={styles.inner}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                Total Locked
                            </div>
                            <div className={styles.value}>
                                1200 Matic
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                Total Ads. Published
                            </div>
                            <div className={styles.value}>
                                400
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                Total Spent
                            </div>
                            <div className={styles.value}>
                                80 Matic
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.graphBox}>
                    <div className={styles.advList}>
                        
                    </div>
                    <div className={styles.graph}>

                    </div>
                </div>
            </div>
        </AdvLayout>
    )
}