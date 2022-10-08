const Staff = require('../models/staffModel');
const mongoose = require('mongoose');

exports.staff_add = (req, res, next) => {
    Staff.find({ email: req.body.email })
        .exec()
        .then(staff => {
            if (staff.length >= 1) {
                return res.status(409).json({
                    message: "Staff Already Exists"
                });
            } else {
                const staff = new Staff({
                    staffName: req.body.staffName,
                    email: req.body.email,
                    mobileNumber: req.body.mobileNumber,
                    createdOn: new Date(),
                    dob: req.body.dob
                });
                staff.save().then(result => {
                    res.status(200).json({
                        message: "staff Added Sucessfully",
                        data: result,
                        status: 200
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.all_staff_list = (req, res, next) => {
    Staff.find()
        .exec()
        .then(result => {
            const staffs = result;
            staffdetails = staffs.map(doc => {
                return {
                    _id: doc._id,
                    staffName: doc.staffName,
                    email: doc.email,
                    mobileNumber: doc.mobileNumber,
                    createdOn: new Date(doc.createdOn),
                    dob: doc.dob
                }
            });
            res.status(200).json({
                message: "All staff details Lists",
                data: staffdetails,
                status: 200
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.single_staff_detail = (req, res, next) => {
    const id = req.params.id;
    Staff.find({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Staff detail",
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

exports.update_staff_detail = (req, res, next) => {
    const id = req.params.id;
    if (req.body.id) {
        Staff.find({ _id: id })
            .exec()
            .then(staff => {
                if (staff.length >= 1) {
                    return res.status(409).json({
                        message: "Staff Already Exists"
                    });
                }
                else {
                    Staff.update({ _id: id }, { $set: req.body })
                        .exec()
                        .then(result => {
                            res.status(200).json({
                                message: "Staff updated",
                                status: 200
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            });
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
        Staff.update({ _id: id }, { $set: req.body })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "Staff updated",
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

exports.delete_staff_detail = (req, res, next) => {
    const id = req.params.id;
    Staff.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Staff deleted Successfully",
                status: 200
            });
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
};