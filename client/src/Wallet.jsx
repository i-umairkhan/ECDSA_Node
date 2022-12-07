import server from "./server";
import PrivateKey from "./PrivateKey"; 

function Wallet({ address, setAddress, balance, setBalance }) {
  // on change function 
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const { data: { balance }, } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <label>
        Private Key
        <input placeholder="Enter your private key"></input>
      </label>


      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
