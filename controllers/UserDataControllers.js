const UserFavourite = require('../models/UserFavouriteSchema');
const UserRegistration = require('../models/UserRegistrationSchema');

// FAVOURITES
exports.getFavourites = async (req, res) => {
  try {
    const { uid } = req.params;
    const favs = await UserFavourite.find({ uid });
    res.json({ success: true, favourites: favs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.toggleFavourite = async (req, res) => {
  try {
    const { uid } = req.params;
    const { eventId } = req.body;
    const existing = await UserFavourite.findOne({ uid, eventId });
    if (existing) {
      await UserFavourite.deleteOne({ _id: existing._id });
      return res.json({ success: true, removed: true });
    }
    const created = await UserFavourite.create({ uid, eventId });
    res.status(201).json({ success: true, favourite: created });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ success: true });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

// REGISTRATIONS
exports.getRegistrations = async (req, res) => {
  try {
    const { uid } = req.params;
    const regs = await UserRegistration.find({ uid }).sort({ createdAt: -1 });
    res.json({ success: true, registrations: regs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createRegistration = async (req, res) => {
  try {
    const { uid } = req.params;
    const { eventId, name, email, phone } = req.body;
    const created = await UserRegistration.create({ uid, eventId, name, email, phone });
    res.status(201).json({ success: true, registration: created });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ success: true, duplicate: true });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const { uid, id } = req.params; // id is registration id
    const deleted = await UserRegistration.findOneAndDelete({ _id: id, uid });
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


