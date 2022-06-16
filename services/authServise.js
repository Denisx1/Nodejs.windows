const ApiError = require('../errors/error')
const bcrypt = require('bcrypt')

const comparePassword = async (hashPassword, password)=>{
    const isPasswordSame = await bcrypt.compare(password, hashPassword)

    if(!isPasswordSame){
        next(new ApiError('Wrong password'))
    }
}

function hashPassword(password){
    return bcrypt.hash(password, 10)
}

module.exports = {
    comparePassword,
    hashPassword
}