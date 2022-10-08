const mongoose = require("mongoose");
const validator = require("validator");

const staffSchema = new mongoose.Schema({
  staffName: {
    type: String,
    required: [true, "Please fill staff name"],
  },
  email: {
    type: String,
    required: [true, "Please fill email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, " Please provide a valid email"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Please fill your password"],
    minLength: 6
  },
  dob: {
    type: Date,
    required: true
  },
  createdOn:
  {
    type: Date,
    required: true
  },

});


const User = mongoose.model("Staff", staffSchema);
module.exports = User;
