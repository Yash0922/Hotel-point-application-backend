const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password : {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        
    },
    bookings:[{
        type: String,
        
    }]
   
    
    
    
})
const User = mongoose.model('Users', userSchema)

module.exports= {User};