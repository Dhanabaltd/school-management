const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/', courseController.course_add);

router.get('/', courseController.all_course_list);

router.get("/:id", courseController.single_course_detail);

router.put("/:id", courseController.update_course_detail);

router.delete("/:id", courseController.delete_course_detail);
module.exports = router;