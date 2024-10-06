const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');

// Use body-parser middleware
app.use(bodyParser.json());

const PORT = process.env.PORT || 3002;

// MIDDLEWARE function to log requests
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
  next();
}

app.use(logRequest);



// Initialize passport middleware
app.use(passport.initialize());

// Protected root route
const localAuthMiddleware = passport.authenticate('local', { session: false });
app.get('/', localAuthMiddleware, (req, res) => {
  res.send('Welcome to my hotel.. how can I help you?');
});

// Import routes
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use imported routes
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
