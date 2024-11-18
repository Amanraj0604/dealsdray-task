const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        userId: user._id, // Ensure userId is included
        userEmail: user.email,
    };

    const secretKey = process.env.JWT_SECRET || "aman";

    const options = {
        expiresIn: '7d',
    };

    // Generate the JWT
    const token = jwt.sign(payload, secretKey, options);

    return token;
};

module.exports = generateToken;
