function Transaction() {
  return (
    <div className="container wallet">
      <h1>Send Transaction</h1>

      <label>
        Private Key
        <input></input>
      </label>

      <input type="submit" className="button" value="Fetch Data" />

      <div className="balance">Public Key: </div>

      <div className="balance">Wallet Address: </div>

      <div className="balance">Wallet Balance: </div>

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
