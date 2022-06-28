const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require('../config/config')
const { tokenTypeEnum, actionTypeEnum } = require('../constants')
const ApiError = require('../errors/error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




const comparePassword = async (hashPassword, password)=>{
    const isPasswordSame = await bcrypt.compare(password, hashPassword)

    if(!isPasswordSame){
        throw new ApiError('Wrong password')
    }
}

function hashPassword(password){
    return bcrypt.hash(password, 10)
}

// tokens
function generateToken(encodeData){
    const access_token = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, {expiresIn: '12h'})
    const refresh_token = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, {expiresIn: '30d'})

    return{
        access_token,
        refresh_token
    }
}

function genrateActionToken(actionType, encodeData = {}){
        return jwt.sign(encodeData, 's', {expiresIn: '24h'})
} 


function validateToken(token, tokenType = tokenTypeEnum.ACCESS) {
    try{
        let secret = ACCESS_TOKEN_SECRET

        if(tokenType===tokenTypeEnum.REFRESH){
            secret = REFRESH_TOKEN_SECRET
        }
        if(tokenType === actionTypeEnum.FORGOT_PASSWORD){
            secret = ACCESS_TOKEN_SECRET
        }

        return jwt.verify(token, secret)

    }catch(e){
        throw new ApiError(e.message || 'Invalid Token', 401)
    }
}



module.exports = {
    comparePassword,
    hashPassword,
    generateToken,
    genrateActionToken,
    validateToken
}