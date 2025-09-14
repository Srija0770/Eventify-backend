const mongoose = require('mongoose');

const UserRegistrationSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, index: true }, // Firebase UID
    eventId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

UserRegistrationSchema.index({ uid: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('UserRegistration', UserRegistrationSchema);


