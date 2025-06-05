const express = require("express");

const Route = express.Router();
const { addUser, getUser, updateUser  } = require("../controllers/userController");


Route.post("/addUser", addUser);
Route.get("/userDetails", getUser);
Route.put("/updateData/:id", updateUser);

module.exports = Route; 