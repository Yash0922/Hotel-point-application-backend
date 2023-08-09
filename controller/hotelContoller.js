const {Visitor} =  require("../models/visitor");

async function  addData (data){

    let newHotel = await Visitor.create({
        title: data.title,
        description: data.description,
        location: data.location,
        price: data.price,
        Start_date:data.Start_date,
        End_date:data.End_date
        
       
    })

    return newHotel;
}

module.exports =  {addData}