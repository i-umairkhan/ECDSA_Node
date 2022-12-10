import { useState } from "react";
import { generateAddress, _publicKey, _address } from "./generateAddress";
import { toHex } from "ethereum-cryptography/utils";
import server from "./server";
import { useEffect } from "react";

function Transaction() {
  // states
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState(new Uint8Array());
  const [address, setAddress] = useState(new Uint8Array());
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    server
      .get(`/balance/0x${toHex(address)}`)
      .then((r) => setBalance(r.data.balance));
  }, [address]);

  return (
    <div className="container wallet">
      <h1>Send Transaction</h1>

      <label>
        Private Key
        <input
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
      </label>

      <button
        className="button"
        onClick={() => {
          generateAddress(privateKey);
          setPublicKey(_publicKey);
          setAddress(_address);
        }}
      >
        Fetch Data
      </button>

      <div className="highlight balance">
        Public Key:
        <br />
        {toHex(publicKey).slice(0, 7)}
        {publicKey.length > 10 && `.....`}
        {toHex(publicKey).slice(-7)}
      </div>

      <div className="highlight balance">
        Wallet Address:
        <br />
        {address.length > 10 && `0x`}
        {toHex(address)}
      </div>

      <div className="highlight balance">Wallet Balance: {balance}</div>

      <label>
        Recipient Address
        <input></input>
      </label>

      <label>
        Enter Amount to send
        <input></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </div>
  );
}

export default Transaction;
