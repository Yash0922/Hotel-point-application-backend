const mongoose = require('mongoose')

const VisitorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true,
    },
    Number_of_touriest: {
        type: Number,
        required: true,
    },
    Budget_per_person: {
        type: Number,
        required: true,
    },
    
    
    
})
const Visitor = mongoose.model('Visitors', VisitorsSchema)

module.exports= {Visitor};