const express = require("express");

const UserRouter = require("./user.route");
const Routes = express.Router();

Routes.use("/api", UserRouter);

module.exports = Routes;