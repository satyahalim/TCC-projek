import User from "../models/UserModel.js";

async function getUser(req,res) {
    try {
        const result = await User.findAll()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
    } 
}


async function createUser(req,res) {
    try {
        await User.create(req.body)
        return res.status(201).json({msg:"acc has been added"})
    } catch (error) {
        console.log(error.message)
    } 
}

async function deleteUser(req,res) {
    try {
       await User.destroy({
        where:{
            id:req.params.id
        }
       })
       res.status(200).json({msg:"user deleted"}) 
    } catch (error) {
        console.log(error.message)
    }  
}

async function updateUser(req,res) {
    try {
       await User.update({
        where:{
            id:req.params.id
        }
       })
       res.status(200).json({msg:"user updated"}) 
    } catch (error) {
        console.log(error.message)
    }  
}

export{getUser,createUser,updateUser,deleteUser}