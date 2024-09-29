const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());



// Root route
app.get('/', function (req, res) {
  res.send('Welcome to my hotel.. how can I help you?');
});





//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use the router
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Start server
app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
 