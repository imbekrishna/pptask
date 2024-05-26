const db = require("../services/db");
const client = require("../services/redis");
const helper = require("../utils/helper");
const logger = require("../utils/logger");

/**
 * Controller for creating assignment
 * @type {ControllerFunction}
 */
async function createAssignment(req, res) {
  const { title, description, dueDate } = req.body;
  const createdBy = req.userId;

  await db.query(
    `
    insert into assignments
    (title, description, dueDate, createdBy)
    values (?, ?, ?, ?)
  `,
    [title, description, dueDate, createdBy]
  );

  await client.del(req.originalUrl);

  res.status(201).json({
    message: "Assignment created successfully",
  });

  const students = await db.query(
    `select email from users where role = 'student'`
  );
  const emails = students.map((student) => student.email);
  const info = await helper.sendMail(title, emails);
  logger.info(info.response);
}

/**
 * Controller for getting assignments
 * @type {ControllerFunction}
 */
async function getAssignments(req, res) {
  const { filterKey, filterValue, sortKey, sortDir } = req.query;

  let query = `select * from assignments`;

  if (filterKey && filterValue) {
    query += ` where ${filterKey} = ${filterValue}`;
  }
  if (sortKey) {
    const dir = sortDir && sortDir.toLowerCase() === "desc" ? "desc" : "asc";
    query += ` order by ${sortKey} ${dir}`;
  }

  const result = await db.query(query);
  const rows = helper.emptyOrRows(result);

  if (rows.length > 0) {
    await client.setEx(req.originalUrl, 3600, JSON.stringify(rows));
  }

  res.status(200).json({ data: rows });
}

/**
 * Controller for getting assignments
 * @type {ControllerFunction}
 */
async function getAssignmentById(req, res) {
  const { id } = req.params;

  const result = await db.query(`select * from assignments where id = ?`, [id]);
  const rows = helper.emptyOrRows(result);

  if (rows.length > 0) {
    await client.setEx(req.originalUrl, 3600, JSON.stringify(rows));
  }

  res.status(200).json({ data: rows });
}

/**
 * Controller for updating assignment
 * @type {ControllerFunction}
 */
async function updateAssignment(req, res) {
  const { title, description, dueDate } = req.body;
  const assignmentId = req.params.id;

  await db.query(`select * from assignments where id = ? and createdBy = ?`, [
    assignmentId,
    req.userId,
  ]);

  const rows = helper.emptyOrRows(res);

  if (rows.length == 0) {
    return res.status(403).json({ message: "Access denied" });
  }

  await client.del(req.originalUrl.replace(req.path, ""));

  await db.query(
    `update assignments set title = ?, description = ?, dueDate = ? where id = ?`,
    [title, description, dueDate, assignmentId]
  );

  res.status(200).json({ message: "Assignment updated successfully" });
}

/**
 * Controller for deleting assignment
 * @type {ControllerFunction}
 */
async function deleteAssignment(req, res) {
  const assignmentId = req.params.id;

  const result = await db.query(
    `select * from assignments where id = ? and createdBy = ?`,
    [assignmentId, req.userId]
  );

  const rows = helper.emptyOrRows(result);

  if (rows.length == 0) {
    return res.status(403).json({ message: "Access denied" });
  }

  await client.del(req.originalUrl.replace(req.path, ""));

  await db.query(`delete from assignments where id = ?`, [assignmentId]);

  res.status(200).json({ message: "Assignment deleted successfully" });
}

/**
 * Controller for creating submission for assignment
 * @type {ControllerFunction}
 */
async function createSubmission(req, res) {
  if (req.userRole !== "student") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { content } = req.body;
  const assignmentId = req.params.id;
  const studentId = req.userId;
  const submissionDate = new Date();

  await client.del(req.originalUrl);

  await db.query(
    `insert into submissions (assignmentId, studentId, submissionDate, content)
    values (?, ?, ?, ?)`,
    [assignmentId, studentId, submissionDate, content]
  );

  res.status(201).json({ message: "Assignment submitted successfully" });
}

module.exports = {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  createSubmission,
};
