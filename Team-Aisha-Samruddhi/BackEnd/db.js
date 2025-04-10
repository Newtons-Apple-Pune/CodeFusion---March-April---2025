const mongoose = require('mongoose');
// const mongoURI = "mongodb+srv://shaikhaishaaw:pXcRk0NKxlMx5Bxu@cluster0.2uo5m04.mongodb.net/TYPROJECT?retryWrites=true&w=majority&appName=Cluster0"; 
const mongoURI = "mongodb+srv://shaikhaishaaw:82917%40Shaikh@cluster0.2uo5m04.mongodb.net/TYPROJECT?retryWrites=true&w=majority&appName=Cluster0";
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongo;
