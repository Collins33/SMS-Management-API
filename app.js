const express = require("express");
const app = express();

/**
 * setup middleware
 * incoming request will
 * go through this
 */
app.use((req, res, next) => {
  res.status(200).json({
    message: "Server running well"
  });
});

module.exports = app;
