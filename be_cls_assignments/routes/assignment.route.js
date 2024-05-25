const express = require("express");
const assignmentRouter = express.Router();

const { verifyToken, isTeacher, getFromCache } = require("../utils/middleware");
const {
  createAssignment,
  createSubmission,
  getAssignments,
  updateAssignment,
  deleteAssignment,
  getAssignmentById,
} = require("../controllers/assignment.controller");

const {
  assignmentSchema,
  validateBody,
  validateParam,
} = require("../utils/validators");

assignmentRouter.get("/", [verifyToken, getFromCache], getAssignments);
assignmentRouter.get(
  "/:id",
  [validateParam, verifyToken, getFromCache],
  getAssignmentById
);
assignmentRouter.post(
  "/:id/submissions",
  [validateParam, verifyToken],
  createSubmission
);

assignmentRouter.post(
  "/",
  [verifyToken, isTeacher, assignmentSchema, validateBody],
  createAssignment
);

assignmentRouter.put(
  "/:id",
  [validateParam, verifyToken, isTeacher, assignmentSchema, validateBody],
  updateAssignment
);
assignmentRouter.delete(
  "/:id",
  [validateParam, verifyToken, isTeacher],
  deleteAssignment
);

module.exports = assignmentRouter;
