const authService = require('../services/authServise')
const User = require('../database/model/schema')
const Amodel = require('../database/model/authModel')
const Role = require('../database/userRols')


module.exports = {
    createUser: async (req, res, next)=>{
        try{
            const hashPassword = await authService.hashPassword(req.body.password)

            const userRole = await Role.findOne({value: "USER"})

            const createUser = await User.create({
                ...req.body,
                password:hashPassword,
                role: [userRole.value]
            })

            res.json(createUser)
        }catch(e){
            next(e)
        }
    },

    login: async (req, res, next)=>{
        try{
            const { user, body: { password } } = req

            await authService.comparePassword(user.password, password)

            const tokenPair = authService.generateToken( { userId: user._id } )

            await Amodel.create({user_id: user._id, ...tokenPair})

            res.json({...tokenPair, user})
            console.log({
                ...tokenPair,
                user
            })

        }catch(e){
            next(e)
        }
    }
}