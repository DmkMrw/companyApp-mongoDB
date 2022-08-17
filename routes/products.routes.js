// post.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');

router.get('/products', (req, res) => {
  res.json(db.products);
});

router.get('/products/random', (req, res) => {
  res.json(db.products[Math.floor(Math.random() * db.length)]);
});

router.get('/products/:id', (req, res) => {
  res.json(db.products.find(item => item.id == req.params.id));
});

router.post('/products', (req, res) => {
  const { name, client } = req.body;
  db.products.push({ id: 3, name, client })
  res.json({ message: 'OK' });
});

router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;
  db = db.products.map(item => (item.id == req.params.id) ? { ...item, name, client } : item );
  res.json({ message: 'OK' });
});

router.delete('/products/:id', (req, res) => {
  db = db.products.filter(item => item.id != req.params.id)
  res.json({ message: 'OK' });
});

module.exports = router;
