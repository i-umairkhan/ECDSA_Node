import { useState } from "react";
import { generateAddress, _publicKey, _address } from "./generateAddress";
import { toHex } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";
import { sha256 } from "ethereum-cryptography/sha256";
import server from "./server";
import { useEffect } from "react";

function Transaction() {
  // states
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState(new Uint8Array());
  const [address, setAddress] = useState(new Uint8Array());
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [sendBalance, setSendBalance] = useState(0);
  const [data, setData] = useState({});
  const [signature, setSignature] = useState(new Uint8Array());

  // to get balance of address from server
  useEffect(() => {
    if (toHex(address)) {
      server
        .get(`/balance/0x${toHex(address)}`)
        .then((r) => setBalance(r.data.balance));
    }
  }, [address]);

  // create a data is used to sign a message
  function transferFunds() {
    if (sendBalance && balance >= sendBalance && balance > 0 && recipient) {
      setData({
        SenderAddress: `0x${toHex(address)}`,
        RecipientAddress: recipient,
        BalanceToSend: sendBalance,
      });
    }
  }

  // to sign a signature with hash data and private key
  useEffect(() => {
    if (data && privateKey) {
      let d = Uint8Array.from(JSON.stringify(data));
      secp.sign(sha256(d), privateKey).then((s) => {
        setSignature(s);
      });
    }
  }, [data]);

  // send tranasaction to server when signature has generated
  useEffect(() => {
    if (toHex(signature)) {
      let d = Uint8Array.from(JSON.stringify(data));
      const recoverdKey = secp.recoverPublicKey(sha256(d), signature, 1);
      console.log(toHex(recoverdKey));
      if (toHex(recoverdKey) == toHex(publicKey)) {
        sendTranasctions();
      }
    }
  }, [signature]);

  // sending tranasaction to server
  const sendTranasctions = () => {
    server
      .post(
        "/send",
        { data },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((r) => console.log(r));
  };

  return (
    <div className="container wallet">
      <h1>Send Transaction</h1>

      <label>
        Private Key
        <input
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          type="password"
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
        Get Public key + Address + Balance
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
        <input
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </label>

      <label>
        Enter Amount to send
        <input
          value={sendBalance}
          onChange={(e) => setSendBalance(e.target.value)}
        />
      </label>

      <button className="button" onClick={() => transferFunds()}>
        Transfer
      </button>
    </div>
  );
}

export default Transaction;
