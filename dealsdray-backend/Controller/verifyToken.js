const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Extract Bearer token
        // console.log("Authorization Header:", authHeader);
        // console.log("Extracted Token:", token);

        jwt.verify(token, process.env.JWT_SECRET || "aman", (err, user) => {
            if (err) {
                // console.log("JWT Verification Error:", err.message);
                return res.status(403).json("Token is not valid!");
            }
            // console.log("Decoded User:", user);
            req.user = user; // Attach decoded payload to request
            next();
        });
    } else {
        // console.log("Authorization Header Missing");
        return res.status(401).json("You are not authenticated");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log("Decoded User ID:", req.user.userId);  
        // console.log("Request Params ID:", req.params.id);

        const userIdFromParams = req.params.id.replace(/[:]/g, ""); 
        if (String(req.user.userId) === String(userIdFromParams)) {
            console.log("Authorization successful");
            next();
        } else {
            console.log("Authorization failed");
            res.status(403).json("You Are Not Allowed to Do That");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization };
