const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const Schema = mongoose.Schema;

const userSchema = Schema({
  full_name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  designation: {
    type: String,
    default: null
  },
  activation_User: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: String,
  resetPasswordExpirs: Date,
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, "SecreyKey", {
    expiresIn: "3D"
  })
}

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){
  //generting Token
  const resetToken = crypto.randomBytes(20).toString("hex")


  //Hashing and adding to userSchema
  this.resetPasswordToken = crypto.
    createHash/*methon */("sha256"/*Algorithm */).
    update(resetToken).
    digest/*to print in format*/("hex")

    this.resetPasswordExpirs = Date.now() + 15 * 60 * 1000;
    return resetToken; 
}


module.exports = mongoose.model("User", userSchema);
