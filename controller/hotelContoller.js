const {Visitor} =  require("../models/visitor");

async function  addData (data){

    let newCollage = await Visitor.create({
        name: data.name,
        Email: data.Email,
        Location: data.Location,
        Number_of_touriest: data.Number_of_touriest,
        Budget_per_person: data.Budget_per_person,
       
    })

    return newCollage;
}

module.exports =  {addData}