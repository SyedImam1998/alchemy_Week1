const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");

(async()=>{

    const privateKey= secp.utils.randomPrivateKey();
    const publicKey=secp.getPublicKey(privateKey);
    const msgHash=await secp.utils.sha256('al Accepted');
    const [sign,recoveryBit]=await secp.sign(msgHash,privateKey,{recovered:true});
    const pub=secp.recoverPublicKey(msgHash, sign, recoveryBit);

    console.log("privatekey:",toHex(privateKey))
    console.log("public Key:",toHex(publicKey))
    console.log("msgHash:",toHex(msgHash));
    console.log("pub v:",toHex(pub));
    console.log("sign:",toHex(sign))
    console.log("recover",recoveryBit)
})();