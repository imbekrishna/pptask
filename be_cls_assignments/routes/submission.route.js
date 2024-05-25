const express = require("express");
const submissionRouter = express.Router();

const { verifyToken, isTeacher } = require("../utils/middleware");
const { gradeSubmission } = require("../controllers/submission.controller");
const { gradeSchema, validateBody } = require("../utils/validators");

submissionRouter.post(
  "/:id/grade",
  [verifyToken, isTeacher, gradeSchema, validateBody],
  gradeSubmission
);

module.exports = submissionRouter;
