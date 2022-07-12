const { regexp } = require('../constants')
const Joi = require('joi')

const loginJoiSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required().trim().lowercase(),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP).required()
})

const emailJoiSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).trim().lowercase().required()
})

const forgotPasswordJoiSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP).required()
})

const changePasswordJoiSchema = Joi.object({
    password: Joi.string().regex(regexp.PASSWORD_REGEXP).required(),
    newPassword: Joi.string().regex(regexp.PASSWORD_REGEXP).required()
})

module.exports = {
    loginJoiSchema,
    emailJoiSchema,
    forgotPasswordJoiSchema,
    changePasswordJoiSchema
}
