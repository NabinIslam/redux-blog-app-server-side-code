const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('<h1>Redux blog app server is running</h1>');
});

app.listen(port, () =>
  console.log(`Redux blog app server is running on port:${port}`)
);
