let mongoose = require('mongoose');
let { validateTimetask ,validateUpdate} = require('./timetask.validator');
let TimetaskModel = require('./timetask.model');
// let timetask = require('./timetask.model');


//insert new Timetask
exports.timetaskInsert = async (req, res, next) => {
  try {
    const { start_time, ideal_time, duration_time, project_id, Emp_id, end_time } = req.body;

    const timetaskAdd = await TimetaskModel.create({
      start_time,
      ideal_time,
      duration_time,
      project_id,
      Emp_id,
      end_time
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(200).json({message:"Failed"})
  }
};
 

exports.validateTime = async (req, res, next) => {
  const { start_time, ideal_time, duration_time, project_id, Emp_id, end_time } = req.body;

  // Convert time strings to Date objects
  const startTime = new Date(start_time);
  const idealTime = new Date(ideal_time);
  const endTime = new Date(end_time);

  // Check if start_time is earlier than end_time
  if (startTime >= endTime) {
    return res.status(400).json({ error: "start_time should be earlier than end_time" });
  }

  // Check if ideal_time is within the range of start_time and end_time
  if (idealTime < startTime || idealTime > endTime) {
    return res.status(400).json({ error: "ideal_time should be between start_time and end_time" });
  }

  // Calculate the valid duration range based on the hours perspective
  const durationMilliseconds = duration_time * 60 * 60 * 1000; // Convert duration_time to milliseconds
console.log(durationMilliseconds);
  // Calculate the end time based on start time and duration
  const calculatedEndTime = new Date(startTime.getTime() + durationMilliseconds);
console.log(calculatedEndTime);
  // Check if calculated end time exceeds the end_time
  if (calculatedEndTime.getTime() > endTime.getTime()) {
    return res.status(400).json({ error: "duration_time exceeds the range of start_time and end_time" });
  }

  // If all validations pass, the time is valid
  // return res.status(200).json({ message: "Time validation successful" });
  next();
};






// Update Timetask
exports.updateTimetask = async (req, res, next) => {
    try {
      let id = req.params.id;
  
      // Validation
      let { error, value } = validateUpdate(req.body);
  
      // Check Error in Validation
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      let timetask = await TimetaskModel.findOneAndUpdate({ _id: id }, value, {
        new: true
      });
  
      if (!timetask) {
        console.log('Timetask not found');
        return res.status(404).json({ message: 'Timetask not found' });
      }
  
      res.status(200).json({ timetask });
    } catch (error) {
  
      console.log(error);
      // Send Error Response
      res.status(500).json('Error updating Timetask');
    }
  };


  // Display Single Timetask
  exports.showTimetask = async (req, res, next) => {
    try {
      let id = req.params.id;
      let timetask = await TimetaskModel.findOne({ _id: id });
  
      if (!timetask) {
        console.log('Timetask not found');
        return res.status(404).json({ message: 'Timetask not found' });
      }
  
      res.status(200).json({ timetask });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  // Display List
exports.showTimetasks = async (req, res, next) => {
    try {
      let timetask = await TimetaskModel.find();
      if (!timetask || timetask.length === 0) {
        console.log('Timetask not found');
        return res.status(404).json({ message: 'Timetask not found' });
      }
      res.status(200).json({ timetask });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  // Delete Timetask
exports.deleteTimetask = async (req, res, next) => {
  try {
    let id = req.params.id;

   let timetask = await TimetaskModel.deleteOne({ _id: id });

    if (!timetask) {
      console.log('Timetask not found');
      return res.status(404).json({ message: 'Timetask not found' });
    }

    res.status(200).json({ id });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ error });
  }
};