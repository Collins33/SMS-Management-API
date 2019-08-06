const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const environment = process.env.ENVIRONMENT;
let url;
if (environment === "local") {
  url = "http://localhost:3000";
} else if (environment === "production") {
  url = "https://sms-management-33.herokuapp.com";
}

// import the schema
const Contact = require("../models/contacts");

/**
 * register the routes
 */
router.get("/", (req, res, next) => {
  Contact.find()
    .select("name number _id")
    .then(contacts => {
      const response = {
        count: contacts.length,
        contacts: contacts.map(contact => {
          return {
            name: contact.name,
            number: contact.number,
            _id: contact._id,
            request: {
              type: "GET",
              description: "Get a single contact",
              url: url + "/api/v1/contacts/" + contact._id
            }
          };
        })
      };
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
      const contactCreated = {
        name: result.name,
        number: result.number,
        _id: result._id,
        request: {
          type: "GET",
          description: "Get the created contact",
          url: url + "/api/v1/contacts/" + result._id
        }
      };
      res.status(201).json({
        message: "Contact was added",
        createdContact: contactCreated
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
      if (contact) {
        const response = {
          name: contact.name,
          number: contact.number,
          _id: contact._id
        };
        res.status(200).json(response);
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
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
