const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const bodyParser = require("body-parser");
require('./models/courseModal');
require('./models/staffModel');


const staffRoutes = require('./routes/staffRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static(process.cwd() + '/uploads'))

app.use(mongoSanitize());
app.use('/api/staffs', staffRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);

app.use('*', (req, res, next) => {
    const err = new Error(404, 'fail', 'undefined route');
    next(err, req, res, next);
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Auth-Token");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
module.exports = app;