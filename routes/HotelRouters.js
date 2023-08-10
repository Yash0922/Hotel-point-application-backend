const express = require('express');
const HotelRouter = express.Router();
const {addData}=  require('../controller/hotelContoller')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/Users');
const {Visitor} = require('../models/visitor')
const Booking = require('../models/Booking');
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
HotelRouter.get('/Search', async (req, res) => {
  const { location, dateRange /*, other filters */ } = req.query;

  try {
    // Implement your search logic based on filters
    const properties = await Visitor.find({ location: location,dateRange:dateRange});
    console.log(properties)
   
  
    res.json({ result: properties});
  } catch (error) {
    console.error('Error searching properties', error);
    res.status(500).json({ error: 'An error occurred while searching properties' });
  }
});

HotelRouter.get('/profile:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile', error);
    res.status(500).json({ error: 'An error occurred while fetching user profile' });
  }
});

HotelRouter.get('/allData', async (req, res) => {
  try {
    const Visitors = await Visitor.find({});

    res.json({ Visitors });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({'An error occurred': error  });
  }
});

HotelRouter.get('/Users', async (req, res) => {
  try {
    const Users = await User.find({});

    res.json({ Users });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({'An error occurred': error  });
  }
});

HotelRouter.post('/Booking', async (req, res) => {
  const { property, startDate, endDate } = req.body;

  try {
    const newBooking = new Booking({ property, startDate, endDate });
    await newBooking.save();
    res.status(201).json({ message: 'Booking successful' });
  } catch (error) {
    console.error('Error creating booking', error);
    res.status(500).json({ error: 'An error occurred while creating the booking' });
  }
});

HotelRouter.post('/register', async (req, res) => {
    const { username, password,Email } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword ,Email});
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
        res.status(200).json({ token ,username,password });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports =  {HotelRouter}