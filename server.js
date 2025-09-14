const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// Models (ensure they're compiled)
require('./models/EventDetailsSchema');
require('./models/UserFavouriteSchema');
require('./models/UserRegistrationSchema');

// Controllers
const {
  testRoute,
  createEventDetails,
  readEventDetails,
  readEventDetailsById,
  updateEventDetails,
  deleteEventDetails,
} = require('./controllers/EventDetailsControllers');
const {
  getFavourites,
  toggleFavourite,
  getRegistrations,
  createRegistration,
  deleteRegistration,
} = require('./controllers/UserDataControllers');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || 'https://eventifytheeventmanagementplatform.netlify.app',
    credentials: true,
  })
);

// Mongo connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.warn('Warning: MONGODB_URI is not set. Set it in your environment.');
}
mongoose
  .connect(mongoUri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

// Routes
app.get('/', testRoute);

// Event details CRUD
app.post('/api/eventDetails', createEventDetails);
app.get('/api/eventDetails', readEventDetails);
app.get('/api/eventDetails/:id', readEventDetailsById);
app.put('/api/eventDetails/:id', updateEventDetails);
app.delete('/api/eventDetails/:id', deleteEventDetails);

// Per-user favourites and registrations (Firebase UID)
app.get('/api/users/:uid/favourites', getFavourites);
app.post('/api/users/:uid/favourites', toggleFavourite);
app.get('/api/users/:uid/registrations', getRegistrations);
app.post('/api/users/:uid/registrations', createRegistration);
app.delete('/api/users/:uid/registrations/:id', deleteRegistration);

// Health
app.get('/health', (req, res) => {
  const state = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
  res.json({ ok: true, dbState: state });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});