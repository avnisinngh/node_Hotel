const express = require('express');
const router = express.Router();

const Person = require('./../models/Person');

// POST route to add a person
router.post('/', async (req, res) => {
    try {
      const data = req.body; // assuming the request body contains the data
  
      // Create a new Person document using Mongoose model
      const newPerson = new Person(data);
  
      // Save the new person to the database
      const response = await newPerson.save();
      console.log('Data saved');
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

  // GET route to retrieve the list of people
router.get('/', async (req, res) => {
    try {
      const data = await Person.find();
      console.log('Data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:workType',async (req, res)=>{ //:variable
    try{
      const workType = req.params.workType; //extract the work type from the URL parameter
      if(workType =='chef' || workType == 'manager' || workType == 'waiter') {
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error:'Invalid work Type'});
      }
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; //extract the id fromt hr URL paramter
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //return the updated document
            runValidators: true, //Run mongoose validation
        });

        if(!response) {
            return res.status(400).json({error: 'Person not found'})
        }
        console.log('data updated');
        res.status(200).json({message:'Person updaed'});
    }catch(err){
        conlove.log(err)
        res.status(500).json({error:'Internal server error'});
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        const personId = req.params.id; //extract the id fromt hr URL paramter

        //asuuming you have a personal model
        const response = await Person.findByIdAndDelete(personId);
        if(!response) {
            return res.status(400).json({error: 'Person not found'})
        }
        console.log('data deletd');
        res.status(200).json({message:'Personn deleted successfully'});

    }catch(err){
        conlove.log(err)
        res.status(500).json({error:'Internal server error'});
    }
})
module.exports = router;