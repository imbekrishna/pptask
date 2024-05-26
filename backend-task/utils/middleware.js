/* eslint-disable no-unused-vars */
const jwt = require("jsonwebtoken");
const logger = require("./logger");
const client = require("../services/redis.js");

/**
 * Express middleware for verifying authorization token.
 * @type {MiddlewareFunction}
 */
const getFromCache = async (req, res, next) => {
  const key = req.originalUrl;

  const response = await client.get(key);
  if (response !== null) {
    return res.status(200).json({ data: JSON.parse(response) });
  }
  next();
};

/**
 * Express middleware for verifying authorization token.
 * @type {MiddlewareFunction}
 */
const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization?.replace("Bearer ", "");

  if (!authToken) {
    return res.status(401).json({ message: "Authorization token missing." });
  }

  const payload = jwt.verify(authToken, process.env.SECRET_KEY);

  req.userId = payload.id;
  req.userRole = payload.role;

  next();
};

/**
 * Express middleware for fetching user from jwt token id.
 * @type {MiddlewareFunction}
 */
const isTeacher = async (req, res, next) => {
  if (req.userRole !== "teacher") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
const isAdmin = async (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};

/**
 * Express middleware for catching unknown endpoints
 * @type {MiddlewareFunction}
 */
const unknownEndpoint = (request, response, next) => {
  response.status(404).json({ error: "Unkonwn endpoint" });
};

/**
 * Express middleware for error handling
 * @type {ErrorhandlerFunction}
 */

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  const statusCode = error.statusCode || 500;
  // console.error(err.message, err.stack);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else {
    response
      .status(statusCode)
      .json({ message: error.sqlMessage || error.message });
    return;
  }
};

module.exports = {
  verifyToken,
  isTeacher,
  isAdmin,
  errorHandler,
  unknownEndpoint,
  getFromCache,
};
