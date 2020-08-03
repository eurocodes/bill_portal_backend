const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

module.exports = app;
