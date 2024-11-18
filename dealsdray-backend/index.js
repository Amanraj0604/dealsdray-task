const express = require('express');
const cors = require('cors');
const connectDb = require('./config/DBconnection');
const errHandler = require("./midlewere/errorHandler");
require('dotenv').config();
const app = express();

connectDb();

// Middleware section
app.use(cors());
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Routes
app.use("/api/dealsdray", require("./Routes/userRoutes"));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// Error Handler
app.use(errHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
