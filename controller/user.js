const { findAllUsers, findUserByProperty, saveUser, deleteUserById } = require("../service/user");
const error = require("../utils/error");

const getUserController = async (_req, res, next) => {
    try {
        const users = await findAllUsers();
        return res.status(200).json(users)
    }
    catch(error){
        next(error);
    }
}

const getUserByIdController = async (req, res, next) => {
    try{
        const {userid} = req.params;
        const user = await findUserByProperty("_id", userid);
        if(!user) {
            throw error("User not found", 400)
        }
        res.status(200).json({user})
    }catch(error){
        next(error);
    }
}

const createUserController = (req, res, next) => {
    try{
        const {name, email, password, role, accountStatus} = req.body;
        saveUser({name, email, password, role, accountStatus}, user => {
            res.status(201).json(user)
        });

    }catch(error){
        next(error);
    }
}

const deleteUserByIdController = async (req, res, next) => {
    try{
        const {userid} = req.params;
        const {deletedCount: isDeleted} = await deleteUserById(userid)
        if(!isDeleted) {
            throw error("User Not Found", 400);
        }
        res.status(204).send();
    }catch(error){
        next(error);
    }
}
const patchUserByIdController = async (req, res, next) => {
    try {
        const {userid} = req.params;
        const {name, role, accountStatus} = req.body;
        const user = await findUserByProperty("_id", userid);
        if(!user) {
            throw error("User not found", 400);
        }

        user.name = name ?? user.name;
        user.role = role ?? user.role;
        user.accountStatus = accountStatus ?? user.accountStatus;
        await user.save();
        res.status(200).json(user);

    }catch(err){
        next(err)
    }
}


module.exports = {
    getUserController, 
    getUserByIdController, 
    createUserController, 
    deleteUserByIdController,
    patchUserByIdController
}