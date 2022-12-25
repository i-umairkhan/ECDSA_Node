import { useState } from "react";
import server from "./server";

function Balance() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  // to get balance of address from server
  const getBalance = () => {
    if (address) {
      server.get(`/balance/${address}`).then((r) => setBalance(r.data.balance));
    }
  };

  return (
    <div className="container wallet">
      <h1>Check Balance</h1>

      <label>
        Enter Address
        <input onChange={(e) => setAddress(e.target.value)} />
      </label>

      <div className="highlight balance">Wallet Balance: {balance}</div>

      <button className="button" onClick={getBalance}>
        Check Balance
      </button>
    </div>
  );
}

export default Balance;
