const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'First name is required']
    },

    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },

    email: {
        type: String,
        required: [true, 'Email name is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'password must have atleast 8 characters'],
    },

    role: {
        type: Number,
        default: 0,
    }
}, {timestamps: true})

//Encrypting password before saving
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

userSchema.methods.comparePassword = async function(enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    })
}

module.exports = mongoose.model("User", userSchema);