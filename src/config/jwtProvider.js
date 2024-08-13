const jwt = require("jsonwebtoken")

const SECRET_KEY = process.env.SECRET_KEY || "biuw8ey122xvshncd4dfbf4bf5v678434567890jkxjxbcdnfdc5641s53";

const generateToken=(userId)=>{
    const token = jwt.sign(
        { userId },
        SECRET_KEY,
        { expiresIn: "48h" }
    )
    return token;
}

const getUserIdFromToken = (token)=>{
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId
}

module.exports = {
    generateToken,
    getUserIdFromToken
}