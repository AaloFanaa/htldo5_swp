// app.js
const express = require('express');
const app = express();
const port = 3010;
const db = require('./db');
app.use(express.json());

const flavors = [
  {
    id: 0,
    flavor: 'Zitrone',
  },
  {
    id: 1,
    flavor: 'Erdbeere',
  },
  {
    id: 2,
    flavor: 'Schoko',
  },
];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/flavor/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`ID from URL: ${id}`);

  res.send('flavor updated');
});

app.post('/ersetzeEis/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const neuesEis = req.body.neuesEis;

  if (flavors[index] !== undefined && neuesEis) {
    flavors[index].name = neuesEis;
    res.send('Erfolgreich ersetzt!');
  } else {
    res.status(400).send('Ungültige Anfrage');
  }
});

app.get('/flavors', (req, res) => {
  res.json(flavors);
});

// Get flavor with id
app.get('/flavors/:id', async (req, res) => {
  try {
    // read parameter from url
    const id = req.params.id;

    // execute query
    db.query('SELECT * FROM flavors WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to fetch flavor' });
      }
      res.status(200).json(result);
    });
    // db.query('SELECT * FROM flavors', '', (err, result) => {
    //   console.log('Error: ', err);
    //   console.log('Result: ', result);
    // });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flavor' + err });
    console.log(err);
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/}`);
});
