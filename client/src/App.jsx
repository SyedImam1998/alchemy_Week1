import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import React,{ useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [sig,setSign]=React.useState();
  const [msgHash,setMsgHash]=React.useState();
  const [recoverBit,setrecoverBit]=React.useState();

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        sig={sig} msgHash={msgHash} recoverBit={recoverBit}
        setSign={setSign} setMsgHash={setMsgHash} setrecoverBit={setrecoverBit}
        
       
      />
      <Transfer setBalance={setBalance} signature={sig} msgHash={msgHash} recoverBit={recoverBit} />
    </div>
  );
}

export default App;
