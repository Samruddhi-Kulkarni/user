const mongoose = require('mongoose');
const userschema = new mongoose.Schema({

    username:String,
    email: String,
    phone: Number,
    password: String,
    confirmpassword: String,
    address: String,
    userpincode: String,
    buyer: {
        type: Boolean,
        default: true
    }
    
})

module.exports = mongoose.model("usercollection", userschema);