const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');

require('./database');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }));
app.use(express.json());

app.use(routes);


app.listen(3333);