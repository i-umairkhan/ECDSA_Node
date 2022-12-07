import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  // state fro balance and address 
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  return (
    <div className="app">
      {/* wallet component  */}
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      {/* Transfer component  */}
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
