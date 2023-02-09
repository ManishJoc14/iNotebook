const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true&tls=false&readPreference=primary";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoose sucessfully");
    })
}
module.exports = connectToMongo;