let express = require('express');
let router = express.Router(); // access the method of route

let roleController = require('./role.controller');

//  Insert table
router.post('/new/:id', roleController.roleInsert);

//  Show List
// router.get('/populate/:id', roleController.courseByStudent);



module.exports = router;