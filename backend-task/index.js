require("express-async-errors");
const config = require("./utils/config");

const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require("cors");
// routers
const authRouter = require("./routes/auth.route");
const assignmentRouter = require("./routes/assignment.route");
const studentRouter = require("./routes/student.route");
const submissionRouter = require("./routes/submission.route");
const userRouter = require("./routes/user.route");

// middlewares
const { errorHandler, unknownEndpoint } = require("./utils/middleware");
const logger = require("./utils/logger");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger.requestLogger);

// health test endpoint
app.get("/api", (req, res) => {
  res.status(200).json({
    name: "Assignment server",
    status: "RUNNING",
    time: new Date(),
  });
});

// swagger
const swaggerspec = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerspec));

// api endpoint routers
app.use("/api/auth", authRouter);
app.use("/api/assignments", assignmentRouter);
app.use("/api/submissions", submissionRouter);
app.use("/api/students", studentRouter);
app.use("/api/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server listening at http://localhost:${config.port}`);
});
