const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = require("mongoose");

const courseSchema = new mongoose.Schema({

  courseName: {
    type: String,
    required: true
  },
  staffName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true
  }
});


const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
