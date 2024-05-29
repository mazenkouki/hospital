const mongoose = require("mongoose");
 const MONGODB_URI = "mongodb://localhost:27017/hospital";
mongoose
  .connect(MONGODB_URI,
    { 
      useUnifiedTopology: true, useNewUrlParser: true,
    
    })
  .then(() => console.log("Connected to mongoose server"))
  .catch((err) => console.log(err));


const db= mongoose.connection;

module.exports = db;