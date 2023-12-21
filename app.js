const express = require("express")
 const app = express();
app.use(express.json());

require("dotenv").config();
const port = process.env.PORT
require('./config/database').dbconnect();

const route = require("./routes/routes")

app.use("/api/v1", route);

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})
