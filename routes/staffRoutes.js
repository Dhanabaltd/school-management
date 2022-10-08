const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.post('/', staffController.staff_add);

router.get('/', staffController.all_staff_list);

router.get("/:id", staffController.single_staff_detail);

router.put("/:id", staffController.update_staff_detail);

router.delete("/:id", staffController.delete_staff_detail);

module.exports = router;