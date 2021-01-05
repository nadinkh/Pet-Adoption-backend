const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoute = require('./routes/UserInfo')
// const putRoute=require('./routes/UserInfo')
const cors = require('cors');

//import route

const authRoute = require('./routes/auth');
dotenv.config();
//connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    { useUnifiedTopology: true },
    { useCreateIndex: true },
    { useFindAndModify: false },
    () => console.log('connected to db!')
);
//Import the mongoose module
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://nadin123:nadin2080@cluster0.mj6t0.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Middlewars 
app.use(express.json())
app.use(cors())

//route MiddleWar 

app.use('/api/user', authRoute);

app.use('/api/userinfo', postRoute)

app.listen(3000, () => console.log('server up and running'));



