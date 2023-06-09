const Joi = require('joi');

const userSchema = Joi.object({
 
  full_name: Joi.string().max(25).required(),
  phone: Joi.string().max(50).required(),
  email_address: Joi.string().email().max(50).required(),
  password: Joi.string().max(50).required(),
  designation: Joi.string().max(100).allow(null),
 
});

const updateSchema = Joi.object({
    full_name: Joi.string().max(25).required(),
    phone: Joi.string().max(50).required(),
    email_address: Joi.string().email().max(50).required(),
    password: Joi.string().max(50).required(),
    designation: Joi.string().max(100).allow(null),
   
  });

// Validate the area data
function validateUser(userData) {
    return userSchema.validate(userData);
  }
  
  function validateUpdate(updateData) {
    return updateSchema.validate(updateData);
  }
  module.exports = {
    validateUser,
    validateUpdate
    
  };

// module.exports = validateuser;