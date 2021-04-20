const express = require("express");

const UserController = require("../controllers/user.controller");

const Routes = express.Router();

Routes.get("/user", UserController.index);
Routes.get("/user/:id", UserController.getOne);
Routes.post("/user", UserController.store);
Routes.put("/user/:_id", UserController.update);
Routes.delete("/user/:_id", UserController.remove);

module.exports = Routes;