const redis = require("redis");
const logger = require("../utils/logger");

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("error", function (err) {
  throw err;
});

client.connect((err, info) => {
  if (err) logger.error(err);
  else logger.info(info);
});

module.exports = client;
