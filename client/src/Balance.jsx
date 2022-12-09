function Balance() {
  return (
    <div className="container wallet">
      <h1>Check Balance</h1>

      <label>
        Enter Address
        <input></input>
      </label>

      <div className="balance">Wallet Balance: </div>

      <button className="button">Check Balance</button>
    </div>
  );
}

export default Balance;
