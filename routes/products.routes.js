// post.routes.js

const express = require('express');
const router = express.Router();
// const db = require('./../db');
// const ObjectId = require('mongodb').ObjectId;
const Product = require('../models/product.model');

/*
router.get('/products', (req, res) => {
  res.json(db.products);
});

router.get('/products', (req, res) => {
  req.db.collection('products').find().toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data);
  });
});
*/
router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

/*
router.get('/products/random', (req, res) => {
  res.json(db.products[Math.floor(Math.random() * db.length)]);
});

router.get('/products/random', (req, res) => {
  req.db.collection('products').aggregate([ { $sample: { size: 1 } } ]).toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});
*/
router.get('/products/random', async (req, res) => {

  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Product.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

/*
router.get('/products/:id', (req, res) => {
  res.json(db.products.find(item => item.id == req.params.id));
});

router.get('/products/:id', (req, res) => {
  req.db.collection('products').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if(err) res.status(500).json({ message: err });
    else if(!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  });
});
*/
router.get('/products/:id', async (req, res) => {

  try {
    const dep = await Product.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

/*
router.post('/products', (req, res) => {
  const { name, client } = req.body;
  db.products.push({ id: 3, name, client })
  res.json({ message: 'OK' });
});

router.post('/products', (req, res) => {
  const { name, client } = req.body;
  req.db.collection('products').insertOne({ name: name, client: client }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  })
});
*/
router.post('/products', async (req, res) => {

  try {

    const { name, client } = req.body;
    const newDepartment = new Product({ name: name, client: client });
    // mongoosowe save to odpowiednik instertOne z MongoDB
    await newDepartment.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

});

/*
router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;
  db = db.products.map(item => (item.id == req.params.id) ? { ...item, name, client } : item );
  res.json({ message: 'OK' });
});

router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;
  req.db.collection('products').updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name, client: client }}, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});
*/
router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;

  try {
    const emp = await Product.findById(req.params.id);
    if(emp) {
      await Product.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

/*
router.delete('/products/:id', (req, res) => {
  db = db.products.filter(item => item.id != req.params.id)
  res.json({ message: 'OK' });
});

router.delete('/products/:id', (req, res) => {
  req.db.collection('products').deleteOne({ _id: ObjectId(req.params.id) }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});
*/
router.delete('/products/:id', async (req, res) => {

  try {
    const dep = await Product.findById(req.params.id);
    if(dep) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

module.exports = router;
