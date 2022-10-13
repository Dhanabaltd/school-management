const Course = require('../models/courseModal');
const Staff = require('../models/staffModel');

exports.course_add = (req, res, next) => {
    console.log('req.body.staffId', req.body.staffId)
    Course.find({ courseName: req.body.courseName })
        .exec()
        .then(course => {
            if (course.length >= 1) {
                return res.status(409).json({
                    message: "Course Already Exists"
                });
            } else {
                const course = new Course({
                    courseName: req.body.courseName,
                    staffId: req.body.staffId,
                    createdOn: new Date()
                });
                course.save().then(result => {
                    res.status(200).json({
                        message: "course Added Sucessfully",
                        data: result,
                        status: 200
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });


};

exports.all_course_list = (req, res, next) => {
    Course.find()
        .populate('staffId', 'staffName')
        .exec()
        .then(result => {
            const course = result;
            coursedetails = course.map(doc => {
                return {
                    _id: doc._id,
                    staffId: doc.staffId,
                    courseName: doc.courseName,
                    createdOn: new Date(doc.createdOn),
                }
            });
            res.status(200).json({
                message: "All Course details Lists",
                data: coursedetails,
                status: 200
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.single_course_detail = (req, res, next) => {
    const id = req.params.id;
    Course.find({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Course detail",
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

exports.update_course_detail = (req, res, next) => {
    const id = req.params.id;
    if (req.body.id) {
        Course.find({ _id: id })
            .exec()
            .then(course => {
                if (course.length >= 1) {
                    return res.status(409).json({
                        message: "Course Already Exists"
                    });
                }
                else {
                    Course.update({ _id: id }, { $set: req.body })
                        .exec()
                        .then(result => {
                            res.status(200).json({
                                message: "Course updated",
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
        Course.update({ _id: id }, { $set: req.body })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "Course updated",
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

exports.delete_course_detail = (req, res, next) => {
    const id = req.params.id;
    Course.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Course deleted Successfully",
                status: 200
            });
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
};