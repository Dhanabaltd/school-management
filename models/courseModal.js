const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({

  courseName: {
    type: String,
    required: true
  },
  staffId: [{
    type: mongoose.Types.ObjectId,
    ref: 'Staff'
  }],
  // staffId: {
  //   type: String,
  //   required: true,
  //   ref: 'Staff'
  // },
  createdOn: {
    type: Date,
    required: true
  }
});


const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
