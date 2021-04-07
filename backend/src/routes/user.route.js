const express = require("express");

const UserController = require("../controllers/user.controller");

const Routes = express.Router();

Routes.get("/user", UserController.index);
Routes.post("/user", UserController.store);

module.exports = Routes;