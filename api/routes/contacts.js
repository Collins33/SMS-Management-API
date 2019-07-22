const express = require("express");
const router = express.Router();
/**
 * register the routes
 */
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "retrieved all contacts"
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "contact was added"
  });
});

router.get("/:contactId", (req, res, next) => {
  const { smsId } = req.params;
  if (smsId === "special") {
    res.status(200).json({
      message: "You are special",
      id: smsId
    });
  } else {
    res.status(200).json({
      message: "You are not special"
    });
  }
});

router.patch("/:contactId", (req, res, next) => {
  res.status(200).json({
    message: "Contact product"
  });
});

router.delete("/:contactId", (req, res, next) => {
  res.status(200).json({
    message: "Contact product"
  });
});

module.exports = router;
