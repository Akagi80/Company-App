const express = require('express');
const router = express.Router();
// const db = require('./../db');
// const ObjectId = require('mongodb').ObjectId;
const Employee = require('../models/employee.model');

/*
router.get('/employees', (req, res) => {
  res.json(db.employees);
});

router.get('/employees', (req, res) => {
  req.db.collection('employees').find().toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data);
  });
});
*/
router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

/*
router.get('/employees/random', (req, res) => {
  res.json(db.employees[Math.floor(Math.random() * db.length)]);
});

router.get('/employees/random', (req, res) => {
  req.db.collection('employees').aggregate([ { $sample: { size: 1 } } ]).toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});
*/
router.get('/employees/random', async (req, res) => {

  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().populate('department').skip(rand);
    if(!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

/*
router.get('/employees/:id', (req, res) => {
  res.json(db.employees.find(item => item.id == req.params.id));
});

router.get('/employees/:id', (req, res) => {
  req.db.collection('employees').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if(err) res.status(500).json({ message: err });
    else if(!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  });
});
*/
router.get('/employees/:id', async (req, res) => {

  try {
    const emp = await Employee.findById(req.params.id).populate('department');
    if(!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

/*
router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;
  db.employees.push({ id: 3, firstName, lastName })
  res.json({ message: 'OK' });
});

router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('employees').insertOne({ firstName: firstName, lastName: lastName }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  })
});
*/
router.post('/employees', async (req, res) => {

  try {

    const { firstName, lastName, department } = req.body;
    const newDepartment = new Employee({ firstName: firstName, lastName: lastName, department: department });
    // mongoosowe save to odpowiednik instertOne z MongoDB
    await newDepartment.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

});

/*
router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  db = db.employees.map(item => (item.id == req.params.id) ? { ...item, firstName, lastName } : item );
  res.json({ message: 'OK' });
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('employees').updateOne({ _id: ObjectId(req.params.id) }, { $set: { firstName: firstName, lastName: lastName }}, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});
*/
router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const emp = await Employee.findById(req.params.id);
    if(emp) {
      await Employee.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, department: department }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

/*
router.delete('/employees/:id', (req, res) => {
  db = db.employees.filter(item => item.id != req.params.id)
  res.json({ message: 'OK' });
});

router.delete('/employees/:id', (req, res) => {
  req.db.collection('employees').deleteOne({ _id: ObjectId(req.params.id) }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});
*/
router.delete('/employees/:id', async (req, res) => {

  try {
    const emp = await Employee.findById(req.params.id);
    if(emp) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});


module.exports = router;
