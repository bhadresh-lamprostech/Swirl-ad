import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from "@/styles/Advertiser.module.scss";

function Navbar() {
  return (
    <nav>
      <div className={styles.advNavMain}>
        <div className={styles.advNavLeft}>
          <Image src={"/swirl-logo2.png"} width={40} height={40} />
        </div>
        <div className={styles.advNavRight}>
          <ul>
            <li>
              <Link href="/advertiser/">Dashboard</Link>
            </li>
            <li>
              <Link href="/advertiser/add-campaign">Add Campaign</Link>
            </li>
            <li>
              <Link href="/advertiser/published-campaign">Published Campaign</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar