const db = require("../services/db");
const helper = require("../utils/helper");
const client = require("../services/redis.js");

/**
 * Controller to fetch a students report
 * @type { ControllerFunction }
 */
async function getReport(req, res) {
  const studentId = req.params.id;

  const rows = await db.query(`select * from submissions where studentId = ?`, [
    studentId,
  ]);

  const result = helper.emptyOrRows(rows);

  const data = {
    studentId,
    assigments: result.map((entry) => ({
      id: entry.id,
      assignmentId: entry.assignmentId,
      grade: entry.grade,
      feedback: entry.feedback,
    })),
  };

  if (result.length > 0) {
    await client.setEx(req.originalUrl, 3600, JSON.stringify(data));
  }

  res.status(200).json({ data });
}

module.exports = {
  getReport,
};
