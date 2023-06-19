let express = require('express');
let router = express.Router(); // access the method of route

let attendanceController = require('./attendance.controller');

    // router.post('/new', ( req, res, next)  => {
    //     res.send("hello world");
    // });

// router.post('/new', attendanceController.attendanceInsert);


// router.get('/list', attendanceController.showAttendances );

// /* show */
// router.get('/show/:id', attendanceController.showAttendance );

// /* update */
// router.post('/update/:id', attendanceController.updateAttendance );

// // /* update */
// router.delete('/delete/:id', attendanceController.deleteAttendance);

//  insert table
router.post('/new/:id', attendanceController.attendanceInsert);
// router.post('/new/:id', attendanceController.attendanceCreate);

//Show List
router.get('/populate/:id', attendanceController.userByAttendance);


module.exports = router;