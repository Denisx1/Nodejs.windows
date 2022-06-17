const ApiError = require('../errors/error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require('../config/config')
const tokenType = require('../constants/tokentypeEnum')

const comparePassword = async (hashPassword, password)=>{
    const isPasswordSame = await bcrypt.compare(password, hashPassword)

    if(!isPasswordSame){
        next(new ApiError('Wrong password'))
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


module.exports = {
    comparePassword,
    hashPassword,
    generateToken
}