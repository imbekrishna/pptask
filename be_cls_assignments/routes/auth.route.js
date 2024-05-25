const express = require("express");
const authRouter = express.Router();
const {
  loginController,
  registerController,
} = require("../controllers/auth.controller");

const {
  loginSchema,
  registerSchema,
  validateBody,
} = require("../utils/validators");

authRouter.post("/login", [loginSchema, validateBody], loginController);
authRouter.post(
  "/register",
  [registerSchema, validateBody],
  registerController
);

module.exports = authRouter;
