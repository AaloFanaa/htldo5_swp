const express = require('express');
const db = require('../database/db');
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    db.query('SELECT * FROM flavors', '', (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to fetch flavors!' });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json({ error: 'Critical database error occurred!' });
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    db.query('SELECT * FROM flavors WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to fetch flavor!' });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flavor' + err });
    console.log(err);
  }
});

router.post('/:id', async (req, res) => {
  res.status(200).json({ Message: 'This does not work, please do not use!' });
});

module.exports = router;
