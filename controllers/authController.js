const ApiError = require('../errors/error')
const authService = require('../services/authServise')
const User = require('../database/model/schema')

module.exports = {
    createUser: async (req, res, next)=>{
        try{
            const hashPassword = await authService.hashPassword(req.body.password)

            const createUser = await User.create({...req.body, password:hashPassword})

            res.json(createUser)
        }catch(e){
            next(e)
        }
    }
}