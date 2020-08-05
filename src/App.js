const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const UserRoute = require('./routes/user.route')

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/v1/user', UserRoute)

module.exports = app;
