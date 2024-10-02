const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem')


router.post('/', async (req, res) => {
    try {
      const data = req.body; // assuming the request body contains the data
  
      // Create a new Item document using Mongoose model
      const newItem = new MenuItem(data);
  
      // Save the new item to the database
      const response = await newItem.save();
      console.log('Data saved');
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // GET route to retrieve the list of Itemrouter
  router.get('/', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log('Data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
//comment added for testing pupose
module.exports = router;