const Joi = require('joi')
const regexp = require('../constants/regexp')

const loginJoiSchema = Joi.object({
    email: Joi.string().regex(regexp.EMAIL_REGEXP).required().trim().lowercase(),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP).required()
})

module.exports = {
    loginJoiSchema
}
