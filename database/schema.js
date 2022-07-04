const { Schema, model } = require('mongoose');
const authService = require('../services/authServise')

const User = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true, required: true },
    age: { type: Number, default: 18 },
    role: { type: String, ref: 'Role', default: 'USER' },
    password: { type: String, required: true, default: null, select: false },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: _userTransformer
        },
        toObject: {
            virtuals: true,
            transform: _userTransformer
        }
    }
);

User.virtual('fullName').get(function () {
    return this.name
})

User.statics = {
    async saveUserWuthHashPassword(userToSave) {
        const hashPassword = await authService.hashPassword(userToSave.password)

        return this.create({
            ...userToSave,
            password: hashPassword
        })
    }
}

User.methods = {
    checkIsPasswordsSame(password) {
        console.log(password)
    },

    toRepresentation() {
        const user = this.toObject()
        delete user.password

        return user
    }
}

module.exports = model('User', User);

function _userTransformer(doc, ret) {
    delete ret.password

    return ret
}