const EventDetails = require('../models/EventDetailsSchema');

exports.testRoute = (req, res) => {
    res.send('Welcome to Eventify API');
};

exports.createEventDetails = async (req, res) => {
    try {
        const newEventDetails = await EventDetails.create(req.body);
        res.status(201).json({ success: true, eventDetails: newEventDetails });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.readEventDetails = async (req, res) => {
    try {
        const eventDetails = await EventDetails.find();
        res.status(200).json({ success: true, eventDetails: eventDetails });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

exports.readEventDetailsById = async (req, res) => {
    try {
        const {id} = req.params;
        const eventDetails = await EventDetails.findOne({ id });
        if (!eventDetails) {
            return res.status(404).json({success: false, message: 'Event not found'})
        }
        res.status(200).json({ success: true, eventDetails});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});
    }
}

exports.updateEventDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await EventDetails.findOneAndUpdate(
            { id },
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, eventDetails: updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

exports.deleteEventDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await EventDetails.findOneAndDelete({ id });
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}