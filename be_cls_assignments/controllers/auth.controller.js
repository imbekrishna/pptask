const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../services/db");
const helper = require("../utils/helper");

/**
 * Controller function for logging user in
 * @type {ControllerFunction}
 */
async function loginController(request, response) {
  const { username, password } = request.body;

  const rows = await db.query(`select * from users where username = ?`, [
    username,
  ]);
  const data = helper.emptyOrRows(rows);

  if (data.length === 0) {
    return response.status(401).json({ message: "Invalid credentials" });
  }

  const user = data[0];
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return response.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    process.env.SECRET_KEY,
    { expiresIn: "14d" }
  );

  response.status(200).json({ token });
}

/**
 * Controller for creating user
 * @type {ControllerFunction}
 */
async function registerController(request, response) {
  const { username, password, email } = request.body;

  const passwordHash = await bcrypt.hash(password, 10);
  const result = await db.query(
    `insert into users
  (username, password, email, role) 
  values (?, ?, ?, ?)`,
    [username, passwordHash, email, "student"]
  );

  if (!result.affectedRows) {
    return response.status(500).json({ message: "Failed to create user" });
  }

  response.status(201).json({ message: "User created" });
}

module.exports = {
  loginController,
  registerController,
};
