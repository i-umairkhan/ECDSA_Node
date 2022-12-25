const secp = require("ethereum-cryptography/secp256k1");
const { sha256 } = require("ethereum-cryptography/sha256");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

// generating random private key using secp utils
const privateKey = secp.utils.randomPrivateKey();

// generating public key from private key using secp
const publiKey = secp.getPublicKey(privateKey);

// generating address from  public key using keccak256
// first byte is removed from public key as it tells about compression or not
// etherum uses last 20 bytes of its keccak hash as its address
const address = keccak256(publiKey.slice(1)).slice(-20);

// using hex decimal notion
console.log("Private Key: " + toHex(privateKey));
console.log("Public Key: " + toHex(publiKey));
console.log("Address: " + `0x${toHex(address)}`);

// creating a meassage in unit8array to be signed
const string = "Umair";
const mesg = new Uint8Array(string);
console.log("Message: " + string);

// generating signature from message and private key
let signature;
let recoverdKey;
// secp promise based signature meathod takes hash of meassage and private key to generate signature
secp
  .sign(sha256(mesg), privateKey)
  .then((s) => {
    signature = s;
    // signature in hex
    console.log("Signature: " + toHex(signature));
  })
  .then(() => {
    // recovering public from message , signature & recovery bit
    recoverdKey = secp.recoverPublicKey(sha256(mesg), signature, 1);
    console.log("Recoverd Public key:" + toHex(recoverdKey));
  })
  .then(() => {
    // verifing signature with meassage hash & public key recoverd from signature
    const isValid = secp.verify(signature, sha256(mesg), recoverdKey);
    console.log("Is Valid signature: " + isValid);
  });
