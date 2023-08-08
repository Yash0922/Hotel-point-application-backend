const mongoose = require('mongoose');

async function connectDatabase() {
    try{
        await mongoose.connect('mongodb+srv://yashkumarpal987:Yash%4015182204@cluster0.ss532hp.mongodb.net/HotelPoint?appName=mongosh+1.8.0')

        console.log('Connected to DB')

    }
    catch(e){
        console.log("error is connnection",e);
    }
    
}

module.exports = {connectDatabase}