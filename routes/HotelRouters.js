const express = require('express');
const HotelRouter = express.Router();
const {addData}=  require('../controller/hotelContoller')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/Users');
const SECRET_KEY = 'your-secret-key';
HotelRouter.post("/addData", async (req,res)=>{
    const data =  req.body
    console.log(data);
try{
    let result = await addData(data)

    // console.log(result);
    res.send(result);
}
    catch(error){
        console.log("Post Error",error)
        res.send(`Data Post fail: ${error}`);
    }

    
})

HotelRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // User login
  HotelRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        res.status(401).json({ error: 'User not found' });
      } else if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username }, SECRET_KEY);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports =  {HotelRouter}