const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

/**
 * Make database connection
 */
mongoose.connect(
  "mongodb+srv://collinsNjau:" +
    process.env.MONGO_PASSWORD +
    "@sms-management-andela-3wunv.mongodb.net/test?retryWrites=true&w=majority",

  { useNewUrlParser: true }
);

/**
 * Use the default node js promise
 */
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const smsRoutes = require("./api/routes/sms");
const contactsRoutes = require("./api/routes/contacts");

/**
 * Give access control
 * to any client
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/**
 * Welcome route
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the application"
  });
});

/**
 * setup middleware
 * incoming request will
 * go through this
 */
app.use("/api/v1/sms", smsRoutes);
app.use("/api/v1/contacts", contactsRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
