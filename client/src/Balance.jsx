function Balance() {
  return (
    <form className="container transfer">
      <h1>Check Balance</h1>

      <label>
        Enter Address
        <input></input>
      </label>

      <div className="balance">Wallet Balance: </div>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Balance;
