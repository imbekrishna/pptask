const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(path.resolve("./"), `.env.${process.env.NODE_ENV}`),
});

const config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  listPerPage: 10,
  port: process.env.PORT || 3001,
};

module.exports = config;
