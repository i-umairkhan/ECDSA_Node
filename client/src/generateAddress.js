import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";

let _publicKey;
let _address;

export const generateAddress = (_privateKey) => {
  _publicKey = secp.getPublicKey(_privateKey);
  _address = keccak256(_publicKey.slice(1)).slice(-20);
};

export { _publicKey, _address };
