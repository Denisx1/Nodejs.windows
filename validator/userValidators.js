const { regexp } = require('../constants')

const Joi = require('joi')

const newUserJoiSchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(50),
    email: Joi.string().email({ minDomainSegments: 2 }).required().lowercase(),
    age: Joi.number().min(6).max(150),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP).required(),
    cars: Joi.array().items(Joi.string())
})

module.exports = {
    newUserJoiSchema
}