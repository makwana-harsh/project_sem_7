import prisma from '../../config/prisma.js';

const findUserByEmailOrUsername = async (userName, userEmailId)=>{
    return prisma.user_auth_table.findFirst({
        where :{
            OR: [
                {username : userName},
                {email : userEmailId}
            ]
        }
    });
};

const createNewUser = async (userData) => {
    return prisma.user_auth_table.create({
        data: {
            userFirstName: userData.firstName,
            userLastName: userData.lastName,
            username: userData.userName,
            email: userData.userEmailId,
            hashedPassword: userData.userPassword
        }
    });
};

const findUserByUsername = async (userName)=>{
    return prisma.user_auth_table.findUnique({
        where : {
            username : userName
        }
    });
};

const findUserByUserId = async (userId)=>{
    return prisma.user_auth_table.findUnique({
        where:{
            id : userId
        }
    });
};

export {findUserByEmailOrUsername, createNewUser, findUserByUsername, findUserByUserId};