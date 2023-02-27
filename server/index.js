const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());
// Pr1: 176dde9536385c656c3b84cec3fcddd9b84008a653c02636c893dd0009733bef
// P1: 0434f01124127333fbf92d9499a827f324eaa95c2e0567c5da7f6759644b8e998bfcdf902e9073d13747a3e5030151b06b6050c0f782eb1d38dc6ab10313d2f996
// msghash: 95efed9f25ef0db2e44b172c2ab7a7f1ae2d92f3140aa4eafff81e90ef9152ef
// sign: 3045022100f0ae005f0df1045cfb11940dc1903c2d2925e9b1f901bb74a26f8b4dcec89614022079b89e1a7d325e836f61a6ea9f181a1357461037f74c59619882e1b1c0abb127
// rB: 0

// Pr2: a061a9aac1dfd9ba109010c9466de210a59f8ab555a03237b9b44de60431bbae
// p2: 0421dc2dfb3ac57a3d3162818a37212a144ad981f73610bb1f81edb4e015c4fde9c5a10041c4de26ce0c45894b727d086b77e824660a6f9e26ef509572067d1c74
// msgHash: c608b3bd99ac0beb915ef46e99401f1065e4c7eb3560a98ffae5e9e5389ba2c9
// sign: 3045022100c139498b136d85d284b05991adf88b742efb9109a0b8f4e9ccf2a53ff0e81ddd02200d3edb64580e1b13399c63892856e8445f02264ffbd82a74adee2f8a5166aa02
// rB: 0

// Pr3: ce626cd256585b2ebc45a1b81b60317edcc9cb15ee0287e61883ec3df9f90834
// P3: 04e9a9ddb77359a8c5433f02c1068ac7ca66e6a28e78ed757c9568de82967d53bd8c592e34f18e341ba20cc40f3797a3201d6bf68f3fa0197d8d46f50d42a36794
// msgHash: 0c8e1fd28eb77e3b4242fee7d2484c9b628d27023976f9b1e20b27cf49caba6d
// sign : 3044022055ef1b9a4c762b0092232925696fd830eb643399801b2c6d110e3931de1840d902205952a7d27b4c3acc2914b66df5a7eb9b05e33f21b69da2c49252f8f8473d3d3a
// recover: 1

const balances = {
  "0434f01124127333fbf92d9499a827f324eaa95c2e0567c5da7f6759644b8e998bfcdf902e9073d13747a3e5030151b06b6050c0f782eb1d38dc6ab10313d2f996": 100,
  "0421dc2dfb3ac57a3d3162818a37212a144ad981f73610bb1f81edb4e015c4fde9c5a10041c4de26ce0c45894b727d086b77e824660a6f9e26ef509572067d1c74": 50,
  "04e9a9ddb77359a8c5433f02c1068ac7ca66e6a28e78ed757c9568de82967d53bd8c592e34f18e341ba20cc40f3797a3201d6bf68f3fa0197d8d46f50d42a36794": 75,
};

app.get("/balance/:msgHash/:sign/:recoverBit", (req, res) => {
  const { msgHash } = req.params;
  const { sign } = req.params;
  const { recoverBit } = req.params;
  const pub=secp.recoverPublicKey(msgHash, sign, parseInt(recoverBit));
  console.log("public key",pub)
  const balance = balances[toHex(pub)] || 0;
  res.send({ balance });
});

app.post("/send/:msgHash/:sign/:recoverBit", (req, res) => {
  const {  recipient, amount } = req.body;
  const { msgHash } = req.params;
  const { sign } = req.params;
  const { recoverBit } = req.params;
  console.log(recipient,msgHash,sign,recoverBit,amount)
  const pub=toHex(secp.recoverPublicKey(msgHash, sign, parseInt(recoverBit)));
  console.log("verify",pub)

  // setInitialBalance(pub);
  // setInitialBalance(recipient);

  if (balances[pub] < amount) {
    console.log("insuff")
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    console.log("suff")
    balances[pub] -= amount;
    balances[recipient] += amount;
    console.log(balances[pub])
    res.send({ balance: balances[pub] });
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
