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
const SmsModel = require("../models/sms");

exports.contacts_get_all = (req, res, next) => {
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
};

exports.contact_create = (req, res, next) => {
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
};

exports.contact_get_one = (req, res, next) => {
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
};

exports.contact_edit_one = (req, res, next) => {
  const { contactId } = req.params;
  Contact.findById(contactId).then(contact => {
    contact.name = req.body.name || contact.name;
    contact.number = req.body.number || contact.number;
    contact.save(function(err) {
      if (err) throw err;
      res.status(200).json({
        message: "Contact was updated successfully",
        updatedContact: contact
      });
    });
  });
};

exports.contact_delete_one = (req, res, next) => {
  const { contactId } = req.params;
  Contact.remove({ _id: contactId })
    .then(() => {
      SmsModel.remove({ senderContactId: contactId }).then(() => {
        res.status(200).json({
          message: "Successfully deleted the contact"
        });
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
