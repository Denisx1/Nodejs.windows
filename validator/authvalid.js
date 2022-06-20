const { regexp } = require('../constants')
const Joi = require('joi')

const loginJoiSchema = Joi.object({
    email: Joi.string().regex(regexp.EMAIL_REGEXP).required().trim().lowercase(),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP).required()
})

module.exports = {
    loginJoiSchema
}
