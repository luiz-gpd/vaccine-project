const express = require("express");

const UserController = require("../controllers/user.controller");

const Routes = express.Router();

Routes.get("/user", UserController.index);
Routes.post("/user", UserController.store);
Routes.put("/user/:name/:consultationDate/:consultationTime", UserController.updateAttended);

module.exports = Routes;