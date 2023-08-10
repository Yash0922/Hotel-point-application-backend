const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
   
    
    
    
})
const User = mongoose.model('Users', userSchema)

module.exports= {User};