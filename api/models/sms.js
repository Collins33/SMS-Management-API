const mongoose = require("mongoose");
const smsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  receiverContactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    required: true
  },
  message: { type: String, required: true },
  senderContactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    required: true
  },
  status: { type: String, required: true }
});

module.exports = mongoose.model("Sms", smsSchema);
