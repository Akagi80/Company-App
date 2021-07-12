const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employees.controller');

router.get('/employees', EmployeeController.getAll);
router.get('/employees/random', EmployeeController.getRandom);
router.get('/employees/:id', EmployeeController.getById);
router.get('/employees', EmployeeController.addNew);
router.get('/employees/:id', EmployeeController.putById);
router.get('/employees/:id', EmployeeController.deleteById);

module.exports = router;
