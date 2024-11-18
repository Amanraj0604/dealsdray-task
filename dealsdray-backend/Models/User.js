const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true, // Corrected typo
        },
        email: {
            type: String,
            required: true // Corrected typo
        },
        password: {
            type: String,
            required: true // Corrected typo
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
