const express = require("express");
const studentRouter = express.Router();

const { verifyToken, getFromCache } = require("../utils/middleware");
const { getReport } = require("../controllers/student.controller");

studentRouter.get("/:id/report", [verifyToken, getFromCache], getReport);

module.exports = studentRouter;
