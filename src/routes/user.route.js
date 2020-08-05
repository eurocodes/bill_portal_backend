const express = require('express');
const UserCtrl = require('../config/usingOBJ/controllers/user.controller')

const Router = express.Router()

Router.post('/create', UserCtrl.createUser)
Router.post('/auth/login', UserCtrl.login)

module.exports = Router;