const express = require("express");
const router = express.Router();
/**
 * register the routes
 */
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "sms get request"
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "sms get request"
  });
});

router.get("/:smsId", (req, res, next) => {
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

router.patch("/:smsId", (req, res, next) => {
  res.status(200).json({
    message: "Updated product"
  });
});

router.delete("/:smsId", (req, res, next) => {
  res.status(200).json({
    message: "Delete product"
  });
});

module.exports = router;
