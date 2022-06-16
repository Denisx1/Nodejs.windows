const { Schema, model } = require('mongoose');
const rols = require('../userRols')

const User = new Schema({
    name : { type: String, trim: true},
    email: { type: String, trim: true, lowercase: true, unique: true, required: true },
    age: { type: Number, default: 18 },
    role: { type: String, enum: Object.values(rols), default:rols.USER},
    password:{type:String, required: true, default: null, select: true},
   },
    {timestamps: true,});

module.exports = model('User', User);