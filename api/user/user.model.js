const mongoose = require("mongoose");

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
    required: true
  },
  designation: {
    type: String,
    default: null
  },
  activation_User: {
    type: Boolean,
    default: true
  }, 
  role :{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Role'
  }
})

module.exports = mongoose.model("User", userSchema);
