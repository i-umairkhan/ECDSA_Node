const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

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
