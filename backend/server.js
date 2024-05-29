const express = require('express');
const mongoose = require("mongoose");
const userRoutes = require('./controllers/rotes/userRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// load env variables
require('dotenv').config()
var conn = require('./database');

const app = express();
const PORT= process.env.PORT || 3001;
 // express app config
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/auth", userRoutes);


app.listen(PORT, () =>
console.log(`app listening at http://localhost:${PORT}`)
);