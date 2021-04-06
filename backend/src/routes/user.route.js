const express = require("express");

const UserController = require("../controllers/user.controller");

const Routes = express.Router();

Routes.get("/user", UserController.index);

module.exports = Routes;