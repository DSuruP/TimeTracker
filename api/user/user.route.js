const express = require('express');
const router = express.Router();

const { 
    userInsert,
    loginUser 
    // logoutUser, 
    // resetPassword, 
    // forgetPassword
} = require('./user.controller');

router.post('/new', userInsert);

router.post('/login', loginUser);

// router.get ('/logout', logoutUser);

// router.post('/password/forgot', forgetPassword);

// router.put ('/password/reset/:token', resetPassword);

module.exports = router;
