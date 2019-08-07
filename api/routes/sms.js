const express = require("express");
const router = express.Router();
const SmsController = require("../controllers/sms");

/**
 * register the routes
 */
router.get("/", SmsController.sms_get_all);

router.post("/", SmsController.sms_add_one);

router.get("/:smsId", SmsController.sms_get_one);

router.delete("/:smsId", SmsController.sms_delete_one);

module.exports = router;
