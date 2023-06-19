let mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
// let { validateUser, validateUpdate } = require('./user.validator');
let user = require('./user.model');
const nodemailer = require("nodemailer");
const ErrorHander = require("../utils/errorhander")
const catchAsyncError = require("../middleware/catchAsyncError")
const sendToken = require("../utils/jwtToken");
const { errorMonitor } = require('nodemailer/lib/xoauth2');
const { sendMail  } = require("../utils/sendEmail");
const getJWTToken = function(){
  return jwt.sign({id:this._id},"SecreyKey",{
    expiresIn: "3D"
  })
}

//insert new User
exports.userInsert = async (req,res,next) => {
    try {
        // Validation
    // let { error, value } = validateUser(req.body);

    // Check Error in Validation
    // if (error) {
    //   return res.status(400).send(error.details[0].message);
    // }

    // Insert table
    // let userModel = new user(value);
    // let savedData = await userModel.save();

    // Send Response
    // res.status(200).json('Data inserted');

    const { full_name, phone, email_address, password, designation } = req.body;

    const userAdd = await user.create({
      full_name,
      phone,
      email_address,
      password,
      designation
    });

    const token = getJWTToken();
    // sendToken(userAdd, 201,res)

    res.status(201).json({
      success: true,
      token,
      userAdd
    });
    
    } catch (error) {

      console.log(error);
       // Send Error Response
    res.status(500).json('Error inserting data into database'); 
    }
};


//Login User
exports.loginUser = catchAsyncError(async (req,res,next) => {
  const {email_address, password} = req.body;

  //checking the email and password
  if (!email_address || !password) {
    return next(new ErrorHander("Please Enter Email and Password",400))

  }

  const userNew = await user.findOne({email_address}).select("+password")

  if(!userNew){
    return next(new ErrorHander("Invalid email and password",401))
  }

  const isPasswordMatched = await userNew.comparePassword(password);

  if(!isPasswordMatched){
    return next(new ErrorHander("Invalid email and password",401))
  }

  // const token = getJWTToken();
  // // const token = req.cookies.token;

  //   res.status(200).json({
  //     success: true,
  //     token,
  //     userNew
  //   }); 

  sendToken(userNew, 201,res)
})

//Logout User
exports.logoutUser = catchAsyncError(async (req,res,next) => {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  
  res.status(200).json({
    success: true,
    message: "Logged Out"
  })
})


//Forgot Password
exports.forgetPassword = catchAsyncError(async (req,res,next) => {

  const userPassword =  await user.findOne({email: req.body.email})

  if(!userPassword){
    return next(new ErrorHander("User not found", 404))
  }

  //Get resetPassword Token
  const resetToken = userPassword.getResetPasswordToken()

  await userPassword.save({validateBeforeSave: false});

  const resetPasswordUrl = `${req.protocol/*to show http/https */}://${req.get(
    "host"
  )}/api/password/rest/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

  try {
    await sendMail ({
      email_address: userPassword.email_address,
      subject: `TimeTracker Password Recovery Done`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${userPassword.email_address} successfully`
    })
  } catch (error) {
    userPassword.resetPasswordToken = undefined;
    userPassword.resetPasswordExpire = undefined; 

    await userPassword.save({validateBeforeSave: false});

    return next(new ErrorHander(error.message, 500))
  }

});

// Update User
// exports.updateUser = async (req, res, next) => {
//     try {
//       let id = req.params.id;
  
//       // Validation
//       let { error, value } = validateUpdate(req.body);
  
//       // Check Error in Validation
//       if (error) {
//         return res.status(400).send(error.details[0].message);
//       }
  
//       let user = await UserModel.findOneAndUpdate({ _id: id }, value, {
//         new: true
//       });
  
//       if (!user) {
//         console.log('User not found');
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       res.status(200).json({ user });
//     } catch (error) {
  
//       console.log(error);
//       // Send Error Response
//       res.status(500).json('Error updating table');
//     }
//   };

  // Display Single User
  // exports.showUser = async (req, res, next) => {
  //   try {
  //     let id = req.params.id;
  //     let user = await UserModel.findOne({ _id: id });
  
  //     if (!user) {
  //       console.log('user not found');
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  
  //     res.status(200).json({ user });
  //   } catch (error) {
  //     res.status(500).json({ error });
  //   }
  // };

  // Display List
// exports.showUsers = async (req, res, next) => {
//     try {
//       let user = await UserModel.find();
//       if (!user || user.length === 0) {
//         console.log('User not found');
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.status(200).json({ user });
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   };

  // Delete Table
// exports.deleteUser = async (req, res, next) => {
//   try {
//     let id = req.params.id;

//    let user = await UserModel.deleteOne({ _id: id });

//     if (!user) {
//       console.log('User not found');
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // res.status(200).json({ id });
//     res.status(200).json("Record Deleted");
//   } catch (error) {
//     // Send Error Response
//     res.status(500).json({ error });
//   }
// };