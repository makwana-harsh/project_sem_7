import {validateRegisterFields, validateLoginFields} from './auth.validation.js';
import {registerFunct, loginFunct, refreshFunct} from './auth.service.js';
import {REFRESH_TOKEN_COOKIE_OPTIONS} from '../../shared/constants/cookie.constants.js';


const register = async (req, res, next)=>{
    try{
        const verifiedRegisterData = validateRegisterFields(req.body);
        
        await registerFunct(verifiedRegisterData);

        res.status(201).json({
            message : "Account has created successfully"
        });
    }
    catch(err){
        next(err);
    }
};

const login = async (req, res, next)=>{
    try{
        const verifiedLoginData = validateLoginFields(req.body);
        const {userName, accessToken, refreshToken} = await loginFunct(verifiedLoginData);

        res.cookie("refreshToken", refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

        res.status(200).json({
            message : `${userName} has successfully logged in.`,
            accessToken
        });
    }   
    catch(err){
        next(err);
    }
};

const refresh = async (req, res, next)=>{
    try{
        const refreshToken = req.cookies.refreshToken;

        const newAccessToken = await refreshFunct(refreshToken);

        res.json({
            accessToken : newAccessToken
        });

    }
    catch(err){
        next(err);
    }
};

const logout = (req, res, next)=>{
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json({
            message: 'Successfully logged out'
        });

    } catch (err) {
        next(err);
    }
}

export { register, login, refresh, logout};