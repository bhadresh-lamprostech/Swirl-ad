import React from 'react'
import { useState, useEffect } from 'react'
import styles from "@/styles/AdvertiserForm.module.scss";
import axios from 'axios';

function AdvForm() {
  const [formData, setFormData] = useState({
    orgUsername: null,
    orgName: null,
    orgLogo: null,
    orgDescription: null,
    orgOrigin: null,
    orgEmpStrength: null,
    orgFounder: null,
    orgCategory: null
  });

  const [countries, setCountries] = useState([]);

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

  useEffect(() => {
    console.log(formData);
  },[formData])

  const submitData = () => {

  }

  return (
    <div className={styles.AdvFormMain}>
      <div className={styles.advFormInner}>
        <h1 className={styles.advFormHeader}>Complete the registration</h1>
        <div id={styles.firstDiv}>
          <label htmlFor='username'>Username</label>
          <input 
            type="text" 
            id="username" 
            onChange={
              (e)=>{
                setFormData({...formData,orgUsername:e.target.value});
              }
            }
          />
        </div>
        <div>
          <label htmlFor='logo'>Logo</label>
          <input 
            type="file" 
            id="logo"
            onChange={
              (e)=>{
                setFormData({...formData, orgLogo:e.target.files[0] });
              }
            } 
          />
        </div>
        <div>
          <label htmlFor='orgname'>Name</label>
          <input 
            type="text" 
            id="orgname"
            onChange={
              (e)=>{
                setFormData({...formData, orgName:e.target.value});
              }
            } 
          />
        </div>
        <div>
          <label htmlFor='orgdescription'>Description</label>
          <textarea 
            id="orgdescription"
            onChange={
              (e)=>{
                setFormData({...formData, orgDescription:e.target.value});
              }
            }
          ></textarea>
        </div>
        <div>
          <label htmlFor='orgorigin'>Country of Origin</label>
          <select 
            id="orgorigin"
            onChange={
              (e)=>{
                setFormData({...formData, orgOrigin:e.target.value});
              }
            }  
          >
            {
              countries.length > 0
              ?
                countries.map((i, index)=>{ 
                  return(<option value={i} key={index} >{i}</option>)
                })
              :
                null
              }
          </select>
        </div>
        <div>
          <label htmlFor='orgstrength'>Employee Strength</label>
          <input 
            type="number" 
            id="orgstrength"
            onChange={
              (e)=>{
                setFormData({...formData,orgEmpStrength:e.target.value});
              }
            } 
          />
        </div>
        <div>
          <label htmlFor='orgfounder'>Founder Name</label>
          <input 
            type="text" 
            id="orgfounder"
            onChange={
              (e)=>{
                setFormData({...formData,orgFounder:e.target.value});
              }
            } 
          />
        </div>
        <div>
          <label htmlFor='orgcategory'>Firm Category</label>
          <input 
            type="text" 
            id="orgcategory"
            onChange={
              (e)=>{
                setFormData({...formData,orgCategory:e.target.value});
              }
           } 
          />
        </div>
        <div>
          <label htmlFor='SubmitForm'></label>
          <input type="button" id="SubmitForm" className={styles.submitForm} onClick={submitData()} value="Add details"/>
        </div>
      </div>
    </div>
  )
}

export default AdvForm;