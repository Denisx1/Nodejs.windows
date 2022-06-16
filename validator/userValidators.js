const Joi = require('joi')

const regexp = require('../constants/regexp')

const newUserJoiSchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(50).trim(),
    email: Joi.string().regex(regexp.EMAIL_REGEXP).required().trim().lowercase(),
    age: Joi.number().integer().min(6),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP).required(),
    cars: Joi.array().items(regexp, Joi.string()).when('girl', {is: true, then: Joi.required()}),
    girl: Joi.boolean()
})

module.exports = {
    newUserJoiSchema
}