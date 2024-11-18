require('dotenv').config();

const mongoose = require('mongoose'); // Fixed typo here

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        // console.log("Database connected:", connect.connection.host, connect.connection.name);
        console.log("Database connected:");
    } catch (err) {
        console.log("Error connecting to database:", err);
        process.exit(1); 
    }
};

module.exports = connectDb;
