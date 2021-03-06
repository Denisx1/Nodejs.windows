const { User, Amodel } = require('../database')
const ApiError = require('../errors/error')
const { validUser, loginValidUser } = require('../validator')
const { authService } = require('../services')


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
 
async function checkAccessToken(req, res, next){
    try{
        const access_token = req.get('Authorization')

        if(!access_token){
            next(new ApiError('no access token', 404))
            return
        }

        authService.validateToken(access_token)
        const tokenData = await Amodel.findOne({ access_token }).populate('user_id')

        if(!tokenData || !tokenData.user_id){
            next(new ApiError('You are not register', 401))
            return
        }
        
        req.authUser = tokenData.user_id
    
        next()
    }catch(e){
        next(e)
    }
} 

function checkRefreshToken(req, res, next){
    try{
        const token = req.get('')

        authService.validateToken(token, 'refresh')

        next()
    }catch(e){
        next(e)
    }
}



module.exports = {
    newUserValidator,
    checkEmailIsDublickate,
    isLoginValid,
    getUserDynamically,
    checkAccessToken,
    checkRefreshToken
}