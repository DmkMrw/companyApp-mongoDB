const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');


router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


router.get('/employees/random', async (req, res) => {

  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


router.get('/employees/:id', async (req, res) => {

  try {
    const dep = await Employee.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


router.post('/employees', async (req, res) => {

  try {
    const { firstName, lastName, department } = req.body
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department:department });
    await newEmployee.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
});


router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body

  try {
    const dep = await Employee.findById(req.params.id);
    if(dep) {
      await Employee.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, department:department }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


router.delete('/employees/:id', async (req, res) => {

  try {
    const dep = await Employee.findById(req.params.id);
    if(dep) {
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
