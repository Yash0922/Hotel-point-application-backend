const mongoose = require('mongoose')

const VisitorsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    Images:[ {
        type: String,
        required: true
    }],
    price: {
        type: Number,
        required: true,
    },
    Start_date: {
        type: String,
        required: true,
    },
    End_date: {
        type: String,
        required: true,
    },
    Rating:{
        type: String,
        required: true,
    }
    
    
    
})
const Visitor = mongoose.model('Visitors', VisitorsSchema)

module.exports= {Visitor};