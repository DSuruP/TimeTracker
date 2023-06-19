// let mongoose = require('mongoose');
// //let { validateAttendance, validateUpdate } = require('./attendance.validator');
// let { validateAttendance, validateUpdate } = require('./attendance.validator');
// let AttendanceModel = require('./attendance.model');
// let attendance = require('./attendance.model');


//insert new Attendance
// exports.attendanceInsert = async (req,res,next) => {
//     try {
//         // Validation
//     let { error, value } = validateAttendance(req.body);

//     // Check Error in Validation
//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }

//     // Insert attendance
//     let attendanceModel = new AttendanceModel(value);
//     let savedData = await attendanceModel.save();

//     // Send Response
//     res.status(200).json('Data inserted');
//     } catch (error) {

//       console.log(error);
//        // Send Error Response
//     res.status(500).json('Error inserting data into database'); 
//     }
// };


// // Update Attendance
// exports.updateAttendance = async (req, res, next) => {
//     try {
//       let id = req.params.id;
  
//       // Validation
//       let { error, value } = validateUpdate(req.body);
  
//       // Check Error in Validation
//       if (error) {
//         return res.status(400).send(error.details[0].message);
//       }
  
//       let attendance = await AttendanceModel.findOneAndUpdate({ _id: id }, value, {
//         new: true
//       });
  
//       if (!attendance) {
//         console.log('Attendance not found');
//         return res.status(404).json({ message: 'Attendance not found' });
//       }
  
//       res.status(200).json({ attendance });
//     } catch (error) {
  
//       console.log(error);
//       // Send Error Response
//       res.status(500).json('Error updating attendance');
//     }
//   };


//   // Display Single Attendance
//   exports.showAttendance = async (req, res, next) => {
//     try {
//       let id = req.params.id;
//       let attendance = await AttendanceModel.findOne({ _id: id });
  
//       if (!attendance) {
//         console.log('Attendance not found');
//         return res.status(404).json({ message: 'Attendancer not found' });
//       }
  
//       res.status(200).json({ attendance });
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   };

//   // Display List
// exports.showAttendances = async (req, res, next) => {
//     try {
//       let attendance = await AttendanceModel.find();
//       if (!attendance || attendance.length === 0) {
//         console.log('Attendance not found');
//         return res.status(404).json({ message: 'Attendance not found' });
//       }
//       res.status(200).json({ attendance });
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   };

//   // Delete Attendance
// exports.deleteAttendance = async (req, res, next) => {
//   try {
//     let id = req.params.id;

//    let attendance = await AttendanceModel.deleteOne({ _id: id });

//     if (!attendance) {
//       console.log('Attendance not found');
//       return res.status(404).json({ message: 'Attendance not found' });
//     }

//     res.status(200).json({ id });
//   } catch (error) {
//     // Send Error Response
//     res.status(500).json({ error });
//   }
// };





let mongoose = require('mongoose');
// let { validateAttendance, validateUpdate } = require('./attendance.validator');
// let { validateAttendance } = require('./attendance.validator');

const User = require('../user/user.model');
const Attendance = require('./attendance.model');

exports.attendanceInsert = async (req,res,next) => {


    // let { error, value } = validateAttendance(req.body);

      console.log(req.params);
      user = req.params;
      id = user.id;
      const { check_in, date, status, check_out, Emp_id, remark} = req.body;
      const attendance = await Attendance.create({
        check_in,
        date,
        status,
        check_out,
        Emp_id,
        remark,
        user:id
      });
      await attendance.save();
      
      console.log(attendance);
      const userById = await User.findById(id);
      console.log(attendance,userById)
      userById.attendance.push(attendance);
      await userById.save();

      return res.send(userById);
  }
// }

// userByAttendance : async (req,res)=>/{
  exports.userByAttendance = async (req,res,next) => {
    const id = req.params.id;
    const userByAttendance = await Attendance.findById(id).populate('user');
    console.log(id)
    // const userByAttendance = await Attendance.findOne(id).populate('user');
    console.log('==============>', id);
    
    // console.log(userByAttendance);

    // const userByAttendance = await Attendance.findById(id);
    res.send(userByAttendance);
    console.log('#####>', id);
  }