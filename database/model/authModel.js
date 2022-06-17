
const { Schema, model } = require('mongoose')

const LoginModel = new Schema({
    user_id: {
        type: String,
        trim: true,
        required: true,
        ref: 'User'
    },

    access_token: { type: String, required: true},
    refresh_token: { type: String, required: true}
},   
    { timestamps: true }
)

module.exports = model('LoginModel', LoginModel)