const express = require('express');
const app = express();
const port = 3010;

const flavorRoutes = require('./routes/flavors');

const middleware = require('./routes/middleware');
app.use(middleware);
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Don't use this route!");
});

app.use('/flavors', flavorRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/}`);
});
