const bcrypt = require('bcrypt');
const User = require('../models/user.model')
const jwtProvider = require('../config/jwtProvider')

const createUser = async (userData)=>{
    try {
        let {firstName,lastName,email,password}=userData;
        const isUserExist = await User.find({email});
        if(isUserExist){
            throw new Error('User already exist with Email');
        }
        const hashedPassword = await bcrypt.hash(password,8)
        
        const user = await User.create({firstName,lastName,email,hashedPassword});

    } catch (error) {
        throw new Error(error.message)
    }
}

const findUserById = async (userId)=>{
    try {
        const user  = await User.findById(userId).populate('address');
        if(!user){
            throw new Error('User not found with ID')
        }
        return user;
    } catch (error) {
        throw new Error(error.message)
    }

}

const getUserByEmail = async (email)=>{
    try {
        const user  = await User.findOne({email})
        if(!user){
            throw new Error('User not found with Email')
        }
        return user;
    } catch (error) {
        throw new Error(error.message)
    }

}

const getUserProfileByToken = async (token)=>{
      try {
        const userId = jwtProvider.getUserIdFromToken(token)
        const user = await findUserById(userId)
        if(!user){
            throw new Error('User not found with ID')
        }
        return user
        
      } catch (error) {
        throw new Error(error.message)
      }
}

const getAllUsers = async ()=>{
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports={
    createUser,
    findUserById,
    getUserByEmail,
    getUserProfileByToken,
    getAllUsers,
}