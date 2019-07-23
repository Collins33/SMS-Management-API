const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));
const smsRoutes = require("./api/routes/sms");
const contactsRoutes = require("./api/routes/contacts");

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
