const { log } = require("console");
const crypto = require("crypto")

const token = crypto.randomBytes(20).toString("hex");

console.log(token)

const tokenCrypto = crypto.createHash/*methon */("sha256"/*Algorithm */).update(token).digest/*to print in format*/("hex")

console.log(tokenCrypto)

