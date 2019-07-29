const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// import the schema
const Contact = require("../models/contacts");

/**
 * register the routes
 */
router.get("/", (req, res, next) => {
  Contact.find()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    number: req.body.number
  });
  contact
    .save()
    .then(result => {
      res.status(201).json({
        message: "Contact was added",
        createdContact: result
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.get("/:contactId", (req, res, next) => {
  const { contactId } = req.params;
  Contact.findById(contactId)
    .then(contact => {
      console.log(contact);
      if (contact) {
        res.status(200).json(contact);
      } else {
        res.status(404).json({
          message: "Contact does not exist"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.patch("/:contactId", (req, res, next) => {
  const { contactId } = req.params;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propsName] = ops.value;
  }
  Contact.update({ _id: contactId }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:contactId", (req, res, next) => {
  const { contactId } = req.params;
  Contact.remove({ _id: contactId })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

module.exports = router;
