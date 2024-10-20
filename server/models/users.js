const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim:true

    },
    lastName: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dp:{
        type:String
    },
    mentor:{
        type:Boolean,
        default:false
    },
    notes:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    
    status: {
        type: Boolean, // Changed from String to Boolean
        default: true, // You can set a default value if needed
      }
    

}, { timestamps: true });

module.exports = mongoose.model('users', UserSchema);