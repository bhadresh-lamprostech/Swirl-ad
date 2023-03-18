import React from 'react'
import { useState, useEffect } from 'react'
import styles from "@/styles/AdvertiserForm.module.scss";
import axios from 'axios';

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
  });

  const [countries, setCountries] = useState([ ]);

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/")
    .then((res)=>{
        let data = res.data.data;
        let country = data.map((d) => {
          return d.country;
        })
        setCountries(country);

      })
  },[]);

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
            {
              countries.length > 0
              ?
                countries.map((i)=>{ 
                  return(<option value={i} >{i}</option>)
                })
              :
                null
              }
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

export default AdvForm;