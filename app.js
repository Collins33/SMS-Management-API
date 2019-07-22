const express = require("express");
const app = express();

const smsRoutes = require("./api/routes/sms");
const contactsRoutes = require("./api/routes/contacts");
/**
 * setup middleware
 * incoming request will
 * go through this
 */
app.use("/api/v1/sms", smsRoutes);
app.use("/api/v1/contacts", contactsRoutes);

module.exports = app;
