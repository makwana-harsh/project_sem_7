import bcrypt from 'bcrypt';

const hashPasswordFunct = async (password)=>{
    return bcrypt.hash(password,10);
}

const comparePasswordFunct = async (password, hashedPassword) =>{
    return bcrypt.compare(password, hashedPassword);
}

export {
    hashPasswordFunct,
    comparePasswordFunct
};