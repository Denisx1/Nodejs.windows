const Joi = require('joi')
const regexp = require('../constants/regexp')

const registerJoiSchema = Joi.object({
    email: Joi.string().regex(regexp.EMAIL_REGEXP).required().trim().lowercase(),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP).required()
})

module.exports = {
    registerJoiSchema
}
