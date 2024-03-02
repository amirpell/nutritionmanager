const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig")
app.use(express.json());
const userRoute = require('./routes/userRoute')
app.use('/api/user' , userRoute);


app.listen(port , () => console.log(`node server start at ${port}`));



