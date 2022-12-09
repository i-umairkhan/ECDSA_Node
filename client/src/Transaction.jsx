import { useState } from "react";
import { generateAddress, _publicKey, _address } from "./generateAddress";
import { toHex } from "ethereum-cryptography/utils";
import server from "./server";

function Transaction() {
  // Private Key : ee932232f63b973919ada07ad5214dfe591433da8fbca22ebf31ab9f0d9dfc0d
  // states
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState(new Uint8Array());
  const [address, setAddress] = useState(new Uint8Array());
  const [balance, setBalance] = useState(0);

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
          server.get(`/balance/${address}`).then((r) => console.log(r));
        }}
      >
        Fetch Data
      </button>

      <div className="highlight balance">
        Public Key:
        <br />
        {toHex(publicKey).slice(0, 7)}
        .....
        {toHex(publicKey).slice(-7)}
      </div>

      <div className="highlight balance">
        Wallet Address:
        <br />
        0x{toHex(address)}
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
