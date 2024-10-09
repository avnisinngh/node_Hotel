const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
// POST route to add a person
router.post('/signup', async (req, res) => {
    try {
      const data = req.body; // assuming the request body contains the data
  
      // Create a new Person document using Mongoose model
      const newPerson = new Person(data);
  
      // Save the new person to the database
      const response = await newPerson.save();
      console.log('Data saved');

      const payload = {
        id: response.id,
        username: response.username
      }
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);
      console.log("Token is: ",token);

      res.status(200).json({response: response, token: token});
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

//login route
router.post('/login', async(req, res)=>{
  try{
    //xtract username and password from request body
    const {username, password} = req.body;

    //find the user by username
    const user = await Person.findOne({username: username});

    //if user does exist or passord does not match , return error
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error:'Invalid usename or password'});
    }

    //generate token
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = generateToken(payload);

    //return token as respponse
    res.json({token});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'}); 
  }

})

//person profile 
router.get('/profile', jwtAuthMiddleware, async(req,res)=>{
  try{
    const userData = req.user;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});
    }catch(err) {
      console.log(err);
    res.status(500).json({error: 'Internal Server Error'}); 
    }
})
// GET route to retrieve the list of people
router.get('/',jwtAuthMiddleware, async (req, res) => {
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