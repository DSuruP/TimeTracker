let express = require('express');
let router = express.Router(); // access the method of route

let roleController = require('./role.controller');

    // role.post('/new', ( req, res, next)  => {
    //     res.send("hello world");
    // });

router.post('/new', roleController.roleInsert);


//router.get('/list', roleController.showRoles );

/* show */
//router.get('/show/:id', roleController.showRole );

// /* update */
//router.post('/update/:id', roleController.updateRole );

// // /* update */
 router.delete('/delete/:id', roleController.deleteRole);

module.exports = router;