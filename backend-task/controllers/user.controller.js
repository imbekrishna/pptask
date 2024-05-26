const db = require("../services/db");
const helper = require("../utils/helper");

/**
 * Controller function for changing role to teacher
 * @type {ControllerFunction}
 */
async function makeTeacher(request, response) {
  const { id } = request.params;
  const rows = await db.query(`select role from users where id = ?`, [id]);

  const data = helper.emptyOrRows(rows);

  if (data.length === 0) {
    return response.status(404).json({ message: `User with ${id} not found.` });
  }
  const role = rows[0].role;
  if (role === "admin") {
    return response
      .status(401)
      .json({ message: "Cannot update role to teacher" });
  }
  if (role === "teacher") {
    return response.status(400).json({ message: "User is already a teacher" });
  }

  await db.query(`update users set role = 'teacher' where id = ?`, [id]);

  response.status(200).json({ message: "Role updated successfully" });
}

/**
 * Controller function for changing role to teacher
 * @type {ControllerFunction}
 */
async function getUserById(request, response) {
  const { id } = request.params;

  const rows = await db.query(`select * from users where id = ?`, [id]);

  const data = helper.emptyOrRows(rows);

  if (data.length === 0) {
    return response.status(404).json({ message: `User with ${id} not found.` });
  }

  response.status(200).json({ data });
}

module.exports = {
  makeTeacher,
  getUserById,
};
