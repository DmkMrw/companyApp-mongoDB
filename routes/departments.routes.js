const express = require('express');
const router = express.Router();
const db = require('./../db');

router.get('/departments', (req, res) => {
  res.json(db.departments);
});

router.get('/departments/random', (req, res) => {
  res.json(db.departments[Math.floor(Math.random() * db.length)]);
});

router.get('/departments/:id', (req, res) => {
  res.json(db.departments.find(item => item.id == req.params.id));
});

router.post('/departments', (req, res) => {
  const { name } = req.body;
  db.departments.push({ id: 3, name })
  res.json({ message: 'OK' });
});

router.put('/departments/:id', (req, res) => {
  const { name } = req.body;
  db = db.departments.map(item => (item.id == req.params.id) ? { ...item, name } : item );
  res.json({ message: 'OK' });
});

router.delete('/departments/:id', (req, res) => {
  db = db.departments.filter(item => item.id != req.params.id)
  res.json({ message: 'OK' });
});

module.exports = router;
