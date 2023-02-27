import server from "./server";
import React from 'react';

function Wallet({ sig,setSign, balance, setBalance,msgHash,setMsgHash,recoverBit,setrecoverBit }) {



  async function onChange(evt) {
    console.log("onChange called")
    const signature = sig;
    

   
    if (recoverBit!=="" || signature!==""|| msgHash!=="") {
      const {
        data: { balance },
      } = await server.get(`balance/${msgHash}/${signature}/${recoverBit}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        
        <input placeholder="Enter Message Hash"  onChange={(e)=>setMsgHash(e.target.value)}></input>
        <input placeholder="Enter Signature"  onChange={(e)=>setSign(e.target.value)}></input>
        <input placeholder="Enter Recovery bit"  onChange={(e)=>setrecoverBit(e.target.value)}></input>
        <button onClick={onChange}>Submit</button>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
