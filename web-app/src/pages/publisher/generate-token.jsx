import React from 'react'
import PubLayout from './pub-layout'
import { Polybase } from "@polybase/client";
import {axios} from 'axios'
import { useAccount } from 'wagmi';

function GenerateToken() {

  // const db = new Polybase({
  //   defaultNamespace:
  //     "pk/0x3dd0a82b180d872bf79edd4659c433f1a0165028da146e710a74d542f8217eaf31e842c710e1607da901443668a3821a84aaefe62200f250b4bed12b16e871ca/Token",
  // });
  const { address } = useAccount();


  const axios = require("axios");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/token?address=${address}`,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });



  return (
    <PubLayout>
      <div>Generate Token</div>
    </PubLayout>
  )
}

export default GenerateToken