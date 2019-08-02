const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const SmsModel = require("../models/sms");
/**
 * register the routes
 */
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "sms get request"
  });
});

router.post("/", (req, res, next) => {
  const sms = new SmsModel({
    _id: mongoose.Types.ObjectId(),
    message: req.body.message,
    receiverContactId: req.body.receiverContactId,
    status: req.body.status,
    senderContactId: req.body.senderContactId
  });
  sms
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "SMS was created",
        smsCreated: result
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
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
