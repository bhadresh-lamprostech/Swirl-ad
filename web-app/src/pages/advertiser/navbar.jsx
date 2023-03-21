import { useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from "@/styles/Advertiser.module.scss";

function Navbar() {
  const router = useRouter();

  useEffect(()=>{
    console.log(router.asPath);
  },[])

  return (
    <nav>
      <div className={styles.advNavMain}>
        <div className={styles.advNavHolder}>
        <div className={styles.advNavLeft}>
          <Image src={"/swirl-logo2.png"} width={40} height={40} />
        </div>
        <div className={styles.advNavRight}>
          <ul>
            <Link href="/advertiser/">
              <li className={ router.asPath === "/advertiser" ? styles.Active : null }>
                Dashboard
              </li>
            </Link>
            <Link href="/advertiser/add-campaign">
              <li className={ router.asPath === "/advertiser/add-campaign" ? styles.Active : null }>
                Add Campaign
              </li>
            </Link>
            <Link href="/advertiser/published-campaign">
              <li className={ router.asPath === "/advertiser/published-campaign" ? styles.Active : null }>
                Published Campaign
              </li>
            </Link>
          </ul>
        </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar