import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from "@/styles/Advertiser.module.scss";

function Navbar() {
  return (
    <nav>
      <div className={styles.advNavMain}>
        <div><Image src={"/swirl-logo2.png"} width={40} height={40} /></div>
        <div>
          <ul>
            <li>
              <Link href="/publisher/">Dashboard</Link>
            </li>
            <li>
              <Link href="/publisher/generate-token">Generate Token</Link>
            </li>
            <li>
              <Link href="/publisher/docs">Docs</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar