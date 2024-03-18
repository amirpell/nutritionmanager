const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig")
app.use(express.json());
const userRoute = require('./routes/userRoute')
const path = require('path')
app.use('/api/user' , userRoute);


app.listen(port , () => console.log(`node server start at ${port}`));
const _dirname = path.dirname("")
const buildPath = path.join(_dirname , "./client/build");

app.use(express.static(buildPath))
app.get("/*" , function(req,res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html")
        , function (err){
            if(err){
                res.status(500).send(err)
                console.log("sakdjasidj")
            }
        }
    );
})

