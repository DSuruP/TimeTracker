let express = require('express');
let router = express.Router(); // access the method of route

let timetaskController = require('./timetask.controller');

    // router.post('/new', ( req, res, next)  => {
    //     res.send("hello world");
    // });

 //router.post('/new',timetaskController.timetaskInsert);
router.post('/new',timetaskController.validateTime, timetaskController.timetaskInsert);



 router.get('/list',timetaskController.showTimetasks );

// /* show */
 router.get('/show/:id',timetaskController.showTimetask );

/* update */
router.post('/update/:id',timetaskController.updateTimetask );

// /* update */
router.delete('/delete/:id',timetaskController.deleteTimetask);

module.exports = router;