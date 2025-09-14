const mongoose = require('mongoose');

const UserFavouriteSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, index: true }, // Firebase UID
    eventId: { type: String, required: true },
  },
  { timestamps: true }
);

UserFavouriteSchema.index({ uid: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('UserFavourite', UserFavouriteSchema);


