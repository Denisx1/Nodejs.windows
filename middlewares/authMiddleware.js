const User = require('../database/model/schema')
const ApiError = require('../errors/error')
const validUser = require('../validator/userValidators')


const newUserValidator = (req, res, next)=>{
    try{ 
        const { error, value } = validUser.newUserJoiSchema.validate(req.body)

        if(error){
            next(new ApiError(error.details[0].message, 400))
            return
        }

        req.body = value

        next()
    }catch(e){
        next(e)
    }
}

const checkEmailIsDublickate = async (req, res, next)=>{
    try{
        const { email = '' } = req.body

        if(!email){
            next(new ApiError('Email is required', 400))
        }

        const isUserPresent = await User.findOne({email: email.toLowerCase().trim()})

        if(isUserPresent){
            next(new ApiError('This user is Exists'))
        }

        next()
    }catch(e){
        next(e)
    }
}

module.exports = {
    newUserValidator,
    checkEmailIsDublickate
}