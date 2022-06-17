const authService = require('../services/authServise')
const User = require('../database/model/schema')
const LoginModel = require('../database/model/authModel')
const ApiError = require('../errors/error')
const Role = require('../database/userRols')
const { removeListener } = require('../database/model/schema')


module.exports = {
    getAllUser: async (req, res, next)=>{
        try{

            const { limit = 5, page = 1} = req.query
    

            const users = await User.find()
            const count = await User.count({})
            
            res.json({
                page,
                parPage: limit,
                data: users,
                count
            })
        }catch(e){
            next(e)
        }
    },

    getLoginUser: async (req, res, next)=>{
        try{

            const { limit = 4, page = 1} = req.query

            const users = await LoginModel.find()
            const count = await LoginModel.count({})

            res.json({
                page,
                parPage: limit,
                data: users,
                count
            })
        }catch(e){
            next(e)
        }
    },

    getUserById: async (req, res, next)=>{
        try{
            const { userIndex } = req.params
            const user = await User.findById(userIndex)

            if(!user){
                next(new ApiError(`User with ${userIndex} is not found`, 404))
                return
            }

            res.json(user)

        }catch(e){
            next(e)
        }
    },

    deleteUserById: async (req, res, next)=>{
        try{
            const { userIndex } = req.params
            const userDelete = await User.deleteOne({_id: userIndex})

            res.json({
                _id: userIndex,
                userDelete,
            })

        }catch(e){
            next(e)
        }
    },

    updateUserRols: async (req, res, next)=>{
        try{
            const { userIndex } = req.params
            const adminRole = new Role({value:"ADMIN"})
            const userUpdate = await User.updateOne(
                {_id: userIndex},
                {role: [adminRole.value]}
            )
            res.json(userUpdate)
           
        }catch(e){
            next(e)
        }
    }

}