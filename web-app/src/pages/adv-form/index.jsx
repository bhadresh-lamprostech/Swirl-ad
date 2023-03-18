import React from 'react'
import { useState, useEffect } from 'react'
import styles from "@/styles/AdvertiserForm.module.scss";

function AdvForm() {
  const formData = useState({
    orgUsername: null,
    orgName: null,
    orgLogo: null,
    orgDescription: null,
    orgOrigin: null,
    orgEmpStrength: null,
    orgFounder: null,
    orgCategory: null
  })
  return (
    <div className={styles.AdvFormMain}>
      <div className={styles.advFormInner}>
        <h1 className={styles.advFormHeader}>Complete the registration</h1>
        <div id={styles.firstDiv}>
          <label htmlFor='username'>Username</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor='logo'>Logo</label>
          <input type="file" id="logo" />
        </div>
        <div>
          <label htmlFor='orgname'>Name</label>
          <input type="text" id="orgname" />
        </div>
        <div>
          <label htmlFor='orgdescription'>Description</label>
          <textarea id="orgdescription"></textarea>
        </div>
        <div>
          <label htmlFor='orgorigin'>Country of Origin</label>
          <select id="orgorigin">
            <option>India</option>
            <option>China</option>
            <option>Mexico</option>
          </select>
        </div>
        <div>
          <label htmlFor='orgstrength'>Employee Strength</label>
          <input type="number" id="orgstrength" />
        </div>
        <div>
          <label htmlFor='orgfounder'>Founder Name</label>
          <input type="number" id="orgfounder" />
        </div>
        <div>
          <label htmlFor='orgcategory'>Firm Category</label>
          <input type="text" id="orgcategory" />
        </div>
        <div>
          <label htmlFor='SubmitForm'></label>
          <input type="button" id="SubmitForm" className={styles.submitForm} value="Add details"/>
        </div>
      </div>
    </div>
  )
}

export default AdvForm