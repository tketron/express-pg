const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('', async (req, res, next) => {
  // Return all companies
  try {
    const data = await db.query('SELECT * FROM companies');
    return res.json(data.rows);
  } catch (e) {
    return next(e);
  }
});

router.post('', async (req, res, next) => {
  // Create a new company
  try {
    const data = await db.query(
      'INSERT INTO companies (name, logo) VALUES ($1, $2) RETURNING *',
      [req.body.name, req.body.logo]
    );
    return res.json(data.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  // Return a single company
  try {
    const companyData = await db.query(
      'SELECT * FROM companies WHERE id = $1',
      [req.params.id]
    );
    const userData = await db.query(
      'SELECT id FROM users WHERE current_company_id = $1',
      [req.params.id]
    );
    companyData.rows[0].users = userData.rows.map(item => item.id);
    return res.json(companyData.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  // Update and return a company
  try {
    const companyData = await db.query(
      'UPDATE companies SET name = $1, logo = $2 WHERE id = $3 RETURNING *',
      [req.body.name, req.body.logo, req.params.id]
    );
    const userData = await db.query(
      'SELECT id FROM users WHERE current_company_id = $1',
      [req.params.id]
    );
    companyData.rows[0].users = userData.rows.map(item => item.id);
    return res.json(companyData.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  // Delete and return a user
  try {
    const companyData = await db.query('SELECT FROM companies WHERE id = $1', [
      req.params.id
    ]);
    const userData = await db.query(
      'SELECT id FROM users WHERE current_company_id = $1',
      [req.params.id]
    );
    companyData.rows[0].users = userData.rows.map(item => item.id);
    await db.query('DELETE FROM companies WHERE id = $1', [req.params.id]);
    return res.json(companyData.rows[0]);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
