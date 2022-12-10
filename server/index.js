const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

// address with their assosiated balances
const balances = {
  // ee932232f63b973919ada07ad5214dfe591433da8fbca22ebf31ab9f0d9dfc0d
  "0x62d796f2d4c52c3645480b3dced884e4dd641c44": 100,
  // 2314827c5a6df7dc786629b798719a86f866882e4ab3c426da922f715f9fd163
  "0x2352ef4bbd6c968cb505dd5df9c7e976d3168c5f": 200,
  // c153cb10913405c34ab9fcf6d9187e59bdd41fa95ff0cd62045c6e49053e3392
  "0xf5231d483afce946aaf33bc1aa92f01f577ef737": 300,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
