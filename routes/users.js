const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('', async (req, res, next) => {
  // Return all users
  try {
    const data = await db.query('SELECT * FROM users');
    return res.json(data.rows);
  } catch (e) {
    return next(e);
  }
});

router.post('', async (req, res, next) => {
  // Create a new user
  try {
    const data = await db.query(
      'INSERT INTO users (first_name, last_name, email, photo) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.body.first_name, req.body.last_name, req.body.email, req.body.photo]
    );
    return res.json(data.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  // Return a single user
  try {
    const data = await db.query('SELECT * FROM users WHERE id = $1', [
      req.params.id
    ]);
    return res.json(data.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  // Update and return a user
  try {
    const data = await db.query(
      'UPDATE users SET first_name = $1, last_name  = $2, email = $3, photo = $4 WHERE id = $5 RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.photo,
        req.params.id
      ]
    );
    return res.json(data.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  // Delete and return a user
  try {
    const data = await db.query('SELECT FROM users WHERE id = $1', [
      req.params.id
    ]);
    await db.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    return res.json(data);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
