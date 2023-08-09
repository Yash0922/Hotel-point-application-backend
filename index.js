const { connectDatabase } =require('./config/db');
const express = require('express');
const cors = require('cors');

const {HotelRouter}  = require("./routes/HotelRouters");

const app = express()

app.use(express.json())
app.use(cors())

app.use("/",HotelRouter);

app.get("/", async (req,res)=>{
  
    res.send("<h1>API WorkSucessful</h1>")
})



const port = 8080;
connectDatabase()
.then(() => {
    app.listen(port, (e) => {
        if(e){
            console.log("Server Error",e);
        }
        console.log(`Server listening on http://localhost:${port}`)
    })
})