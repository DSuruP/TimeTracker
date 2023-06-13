let mongoose = require('mongoose');
// let { validateRole, validateUpdate } = require('./role.validator');
let { validateRole } = require('./role.validator');

const User = require('../user/user.model');
const Role = require('./role.model');


exports.roleInsert = async (req,res,next) => {
  // module.exports = {
  //   create : async (req, res) => {
  
      let { error, value } = validateRole(req.body);
  
        console.log(req.params);
        user = req.params;
        id = user.id;
        const { name} = req.body;
        const role = await Role.create({
          name,
          user:id
        });
        await role.save();
  
        const userById = await User.findById(id);
        console.log(role,userById)
        userById.role.push(role);
        await userById.save();
  
        return res.send(userById);
    }