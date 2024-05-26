const express = require("express");
const userRouter = express.Router();

const { verifyToken, isAdmin } = require("../utils/middleware");
const { makeTeacher, getUserById } = require("../controllers/user.controller");
const { validateParam } = require("../utils/validators");

userRouter.get("/:id", [verifyToken, validateParam, isAdmin], getUserById);

userRouter.patch(
  "/:id/makeTeacher",
  [verifyToken, validateParam, isAdmin],
  makeTeacher
);

module.exports = userRouter;
