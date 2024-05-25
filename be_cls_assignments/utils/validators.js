const { body, validationResult } = require("express-validator");

const registerSchema = [
  body("username", "Username cannot be empty").notEmpty().trim(),
  body("password", "Password cannot be empty")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 or more characters"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email"),
];

const loginSchema = [
  body("username", "Username cannot be empty").notEmpty().trim(),
  body("password", "Password cannot be empty").notEmpty(),
];

const assignmentSchema = [
  body("title", "Title cannot be empty").isString().notEmpty().trim(),
  body("description", "Description cannot be empty")
    .isString()
    .notEmpty()
    .trim(),
  body("dueDate", "Due date cannot be empty")
    .notEmpty()
    .matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
    .withMessage("Invalid date format"),
];

const gradeSchema = [
  body("grade", "Grade cannot be empty")
    .isInt({ min: 0, max: 100 })
    .withMessage("Grade must be an integer"),
  body("feedback", "Feedback cannot be empty").notEmpty(),
];

const validateParam = async (req, res, next) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ message: "Valid id required" });
  }
  next();
};

const validateBody = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const mappedErrors = [];
    errors.array().map((err) => mappedErrors.push(err.msg.trim()));
    return res.status(400).json({ errors: mappedErrors });
  }

  next();
};

module.exports = {
  assignmentSchema,
  validateParam,
  registerSchema,
  loginSchema,
  gradeSchema,
  validateBody,
};
