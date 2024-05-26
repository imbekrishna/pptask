const express = require("express");
const submissionRouter = express.Router();

const { verifyToken, isTeacher } = require("../utils/middleware");
const {
  gradeSubmission,
  getAllSubmissions,
  getSubmissionById,
} = require("../controllers/submission.controller");
const {
  gradeSchema,
  validateBody,
  validateParam,
} = require("../utils/validators");

submissionRouter.get("/", [verifyToken, isTeacher], getAllSubmissions);
submissionRouter.get(
  "/:id",
  [verifyToken, isTeacher, validateParam],
  getSubmissionById
);
submissionRouter.post(
  "/:id/grade",
  [verifyToken, isTeacher, gradeSchema, validateBody],
  gradeSubmission
);

module.exports = submissionRouter;
