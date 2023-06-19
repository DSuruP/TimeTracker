const { string, date } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timetaskSchema = Schema({


    start_time: {
        type: Date,
        required: true
       // default: Date.now,
      },
      ideal_time: {
        type: Date,
        required: true
      },
      duration_time: {
        type: Number,
        required: true
        //default: Date.now,
      },
      project_id: {
        type: String,
        required: true
      },
      Emp_id: {
        type: String,
        required: true
      },
      end_time: {
        type: Date,
        required: true
       // default: Date.now,
      }
  
 })

 module.exports = mongoose.model("Timetask", timetaskSchema);