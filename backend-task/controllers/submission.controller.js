const db = require("../services/db");
const helper = require("../utils/helper");
/**
 * Controller function to grade a submission
 * @type {ControllerFunction}
 */
async function gradeSubmission(req, res) {
  const { grade, feedback } = req.body;
  const submissionId = req.params.id;

  const result = await db.query(
    `SELECT submissions.* 
      FROM submissions 
      JOIN assignments 
        ON submissions.assignmentId = assignments.id 
      WHERE submissions.id = ? AND assignments.createdBy = ?`,
    [submissionId, req.userId]
  );

  const rows = helper.emptyOrRows(result);

  if (rows.length == 0) {
    return res.status(403).json({ message: "Access Denied" });
  }

  await db.query(
    `update submissions set grade = ?, feedback = ? where id = ?`,
    [grade, feedback, submissionId]
  );

  res.json({ message: "Submission graded successfully" });
}
/**
 * Controller function to grade a submission
 * @type {ControllerFunction}
 */
async function getSubmissionById(req, res) {
  const submissionId = req.params.id;

  const result = await db.query(
    `SELECT * FROM submissions WHERE submissions.id = ?`,
    [submissionId]
  );

  const rows = helper.emptyOrRows(result);

  res.json({ data: rows });
}
/**
 * Controller function to grade a submission
 * @type {ControllerFunction}
 */
async function getAllSubmissions(req, res) {
  const result = await db.query(`SELECT * from submissions`);

  const rows = helper.emptyOrRows(result);

  res.json({ data: rows });
}

module.exports = { getSubmissionById, getAllSubmissions, gradeSubmission };
