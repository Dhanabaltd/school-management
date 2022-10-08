const express = require('express');
const router = express.Router();
const studentController = require('./../controllers/studentController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid File Format'), false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: filefilter
});

router.post('/', upload.single('studentImage'), studentController.student_add);

router.get('/', studentController.all_student_list);

router.get("/:id", studentController.single_student_detail);

router.put("/:id", upload.single('studentImage'), studentController.update_student_detail);

router.delete("/:id", studentController.delete_student_detail);

module.exports = router;