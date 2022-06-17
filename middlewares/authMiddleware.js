const User = require('../database/model/schema')
const ApiError = require('../errors/error')
const validUser = require('../validator/userValidators')
const loginValidUser = require('../validator/authvalid')


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

const isLoginValid  = (req, res, next)=>{
    try{
        const { value, error } = loginValidUser.loginJoiSchema.validate(req.body)

        if(error){
            next(new ApiError('Error', 404))
            return
        }

        req.body = value

        next()
    }catch(e){
        next(e)
    }
}

// Hard
const getUserDynamically = (
    paramName = '_id',
    where = 'body',
    databasefield = paramName
    )=>{
        return async (req, res, next)=>{
            try{
                const findObject = req[where]

                if(!findObject || typeof findObject !== 'object'){
                    next(new ApiError('data is abcent'))
                    return
                }

                const param = findObject[paramName]
                const userx = await User.findOne( { [ databasefield ]: param}).select('password')

                if(!userx){
                    next(new ApiError('not register'))
                    return
                }

                req.user = userx

                next()
            }catch(e){
                next(e)
            }
        }
    }

module.exports = {
    newUserValidator,
    checkEmailIsDublickate,
    isLoginValid,
    getUserDynamically
}