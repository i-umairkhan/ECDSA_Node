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
};

// to get balance of account needs address
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

// to transfer amounts needs sender + recier address and amount to send
app.post("/send", (req, res) => {
  const sender = req.body.data.SenderAddress;
  const recipient = req.body.data.RecipientAddress;
  const balance = req.body.data.BalanceToSend;
  balances[sender] -= parseInt(balance);
  balances[recipient] += parseInt(balance);
  res.send({
    SenderBalance: balances[sender],
    RecipientBalance: balances[sender],
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
