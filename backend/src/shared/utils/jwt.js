import jwt from "jsonwebtoken";

const generateAccessOrRefreshToken = (payload, TOKEN_SECRET_KEY, expiryTime)=>{
    return jwt.sign(
        payload,
        TOKEN_SECRET_KEY,
        {expiresIn : expiryTime}
    );
};


const verifyToken = (token, TOKEN_SECRET_KEY) =>{
    return jwt.verify(token, TOKEN_SECRET_KEY);
};


export {generateAccessOrRefreshToken, verifyToken};