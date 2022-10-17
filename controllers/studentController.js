const Student = require('../models/studentModal');
const mongoose = require('mongoose');
const fs = require("fs");

exports.student_add = (req, res, next) => {
    Student.find({ email: req.body.email })
        .exec()
        .then(student => {
            if (student.length >= 1) {
                return res.status(409).json({
                    message: "Student Already Exists"
                });
            } else {
                const student = new Student({
                    studentName: req.body.studentName,
                    email: req.body.email,
                    dob: req.body.dob,
                    bloodGroup: req.body.bloodGroup,
                    fatherName: req.body.fatherName,
                    motherName: req.body.motherName,
                    courseId: req.body.courseId,
                    staffId: req.body.staffId,
                    address: req.body.address,
                    studentImage: req.file.path || 'uploads\\profile-pic-default.jpg',
                    imageName: req.file.filename,
                    createdOn: new Date(),
                });
                student.save().then(result => {
                    res.status(200).json({
                        message: "Student Added Sucessfully",
                        data: result,
                        status: 200
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            }
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.all_student_list = (req, res, next) => {
    Student.find()
        .populate('courseId')
        .populate({
            path: 'staffId',
            model: 'Staff'
        })
        .exec()
        .then(result => {
            const students = result;
            studentdetails = students.map(doc => {
                return {
                    _id: doc._id,
                    studentName: doc.studentName,
                    email: doc.email,
                    dob: doc.dob,
                    bloodGroup: doc.bloodGroup,
                    fatherName: doc.fatherName,
                    motherName: doc.motherName,
                    courseId: doc.courseId,
                    staffId: doc.staffId,
                    address: doc.address,
                    studentImage: doc.studentImage,
                    imageName: doc.filename,
                    createdOn: new Date(doc.createdOn),
                }
            });
            res.status(200).json({
                message: "All Students Lists",
                data: studentdetails,
                status: 200
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.single_student_detail = (req, res, next) => {
    const id = req.params.id;
    Student.find({ _id: id })
        .populate('courseId')
        .populate('staffId')
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Student detail",
                data: result[0],
                status: 200
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};



exports.update_student_detail = (req, res, next) => {
    const id = req.params.id;
    req.body['imageName'] = req.file.filename || null;
    req.body['studentImage'] = req.file.path || null;
    if (req.body.id) {
        Student.find({ _id: id })
            .exec()
            .then(student => {
                if (student.length >= 1) {
                    return res.status(409).json({
                        message: "Student Already Exists"
                    });
                }

                else {
                    const url = student[0]._doc.studentImage.split("\\");
                    fs.unlink("./uploads/" + url[1], (err) => {
                        if (err) {
                            res.status(500).json({
                                error: 'Error Deleting Old File'
                            });
                        } else {
                            Student.update({ _id: id }, { $set: req.body })
                                .exec()
                                .then(result => {
                                    res.status(200).json({
                                        message: "Student updated",
                                        status: 200
                                    });
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        error: err
                                    });
                                });
                        }
                    });

                }
            })
            .catch(error => {
                res.status(500).json({
                    error: err
                });
            });
    }
    else {
        Student.update({ _id: id }, { $set: req.body })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "Student updated",
                    status: 200
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    }
};

exports.delete_student_detail = (req, res, next) => {
    const id = req.params.id;
    Student.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Student deleted Successfully",
                status: 200
            });
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
};