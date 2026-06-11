import {hashPasswordFunct, comparePasswordFunct} from '../../shared/utils/hash.js';
import {findUserByEmailOrUsername, createNewUser, findUserByUsername, findUserByUserId} from './auth.repository.js'
import {generateAccessOrRefreshToken, verifyToken} from '../../shared/utils/jwt.js';


const registerFunct = async (data) =>{
    const existingUser = await findUserByEmailOrUsername(data.userName, data.userEmailId);
    if(existingUser){
        const err = new Error("Username or email already exist, try another");
        err.status = 409;
        throw err;
    }

    const hashedPassword = await hashPasswordFunct(data.userPassword);
    data.userPassword = hashedPassword;
    await createNewUser(data); 
    
    return;
}

const loginFunct = async (data)=>{
    const err = new Error();
    err.status = 401;

    const { userName, userPassword } = data;
    const existingUser = await findUserByUsername(userName);

    if(!existingUser){
        err.message = "Invalid username or password";
        throw err;
    }
    const isvalidPassword = await comparePasswordFunct(userPassword, existingUser.hashedPassword);
    if(!isvalidPassword){
        err.message = "Invalid username or password";
        throw err;
    }

    const accessToken = generateAccessOrRefreshToken(
        {userName : existingUser.username, userId : existingUser.id}, 
        process.env.JWT_ACCESS_TOKEN_SECRET, 
        process.env.JWT_ACCESS_TOKEN_EXPIRY
    );

    const refreshToken = generateAccessOrRefreshToken(
        {userId : existingUser.id}, 
        process.env.JWT_REFRESH_TOKEN_SECRET, 
        process.env.JWT_REFRESH_TOKEN_EXPIRY
    );

    return {userName : existingUser.username, accessToken , refreshToken};
}

const refreshFunct = async (refreshToken)=>{
    const err = new Error();
    err.status = 401;

    if(!refreshToken){
        err.message = "Refresh token missing";
        throw err;
    }

    let decode;
    try{
        decode = verifyToken(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    }
    catch(tokenErr){
        err.message = "Session expired, please login again";
        throw err;
    }
    
    const userObj = await findUserByUserId(decode.userId);

    if(!userObj){
        err.message = "User record does not exist, please register first";
        throw err;
    }

    const newAccessToken = generateAccessOrRefreshToken(
        {userName : userObj.username, userId : userObj.id}, 
        process.env.JWT_ACCESS_TOKEN_SECRET, 
        process.env.JWT_ACCESS_TOKEN_EXPIRY
    ); 

    return newAccessToken;
}



export {registerFunct, loginFunct, refreshFunct};