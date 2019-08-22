const express = require("express");
const router = express.Router();
const ContactsController = require("../controllers/contacts");

/**
 * register the routes
 */
router.get("/", ContactsController.contacts_get_all);

router.post("/", ContactsController.contact_create);

router.get("/:contactId", ContactsController.contact_get_one);

router.put("/:contactId", ContactsController.contact_edit_one);

router.delete("/:contactId", ContactsController.contact_delete_one);

module.exports = router;
