const { Schema, model } = require('mongoose');


const User = new Schema({
    name : { type: String, trim: true, required: true},
    email: { type: String, trim: true, lowercase: true, unique: true, required: true },
    age: { type: Number, default: 18 },
    role: [{ type: String, ref: 'Role', default: "USER"}],
    password:{type:String, required: true, default: null, select: false},
   },
    {timestamps: true,});

module.exports = model('User', User);