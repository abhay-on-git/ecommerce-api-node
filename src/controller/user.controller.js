const userServices = require('../services/user.service')






// [Bearer,token]
const getUserProfile = async (req,res)=>{
    try {
        const jwt = req.headers.authorization?.split(" ")[1]
        if(!jwt){
            return res.status(401).json({message: "Unauthorized"})
        }
        const user = await userServices.getUserProfileByToken(jwt)
        res.status(200).send(user)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllUsers = async (req,res)=>{
    try {
        const users = await userServices.getAllUsers();
        res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    getUserProfile,
    getAllUsers,
}