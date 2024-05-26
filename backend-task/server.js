const config = require("./utils/config");
const logger = require("./utils/logger");

const app = require("./app.js");

app.listen(config.port, () => {
  logger.info(`Server is running on  http://localhost:${config.port}`);
});
