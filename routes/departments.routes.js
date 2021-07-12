const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getById);
router.get('/departments', DepartmentController.addNew);
router.get('/departments/:id', DepartmentController.putById);
router.get('/departments/:id', DepartmentController.deleteById);

module.exports = router;
