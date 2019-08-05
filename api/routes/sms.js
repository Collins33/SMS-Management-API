const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const SmsModel = require("../models/sms");
const Contact = require("../models/contacts");
/**
 * register the routes
 */
router.get("/", (req, res, next) => {
  SmsModel.find()
    .select("message receiverContactId status senderContactId")
    .exec()
    .then(messages => {
      res.status(200).json({
        count: messages.length,
        sms: messages.map(message => {
          return {
            _id: message._id,
            sender: message.senderContactId,
            receiver: message.receiverContactId,
            status: message.status,
            message: message.message,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/v1/sms/" + message._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  Contact.findById(req.body.receiverContactId)
    .then(contact => {
      if (!contact) {
        return res.status(404).json({
          message: "The contact does not exist"
        });
      }

      const sms = new SmsModel({
        _id: mongoose.Types.ObjectId(),
        message: req.body.message,
        receiverContactId: req.body.receiverContactId,
        status: req.body.status,
        senderContactId: req.body.senderContactId
      });
      return sms.save();
    })
    .then(result => {
      res.status(200).json({
        message: "SMS was created",
        smsCreated: {
          _id: result._id,
          sender: result.senderContactId,
          receiver: result.receiverContactId,
          status: result.status,
          message: result.message
        },
        request: {
          type: "GET",
          description: "Get a single sms",
          url: "http://localhost:3000/api/v1/sms/" + result._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.get("/:smsId", (req, res, next) => {
  const smsId = req.params.smsId;
  SmsModel.findById(smsId)
    .exec()
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: "The sms does not exist"
        });
      }
      res.status(200).json({
        sms: result,
        response: {
          type: "GET",
          description: "Get all sms",
          url: "http://localhost:3000/api/v1/sms/"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/:smsId", (req, res, next) => {
  res.status(200).json({
    message: "Updated product"
  });
});

router.delete("/:smsId", (req, res, next) => {
  const smsId = req.params.smsId;
  SmsModel.remove({ _id: smsId })
    .exec()
    .then(result => {
      console.log(result.n);
      if (result.n == 0) {
        return res.status(404).json({
          message: "The sms does not exist"
        });
      }
      res.status(200).json({
        message: "SMS was deleted",
        request: {
          type: "GET",
          description: "Get all sms",
          url: "http://localhost:3000/api/v1/sms/"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
