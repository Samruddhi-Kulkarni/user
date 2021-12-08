const Joi = require('joi')
// const userSchema = require('./models/userSchema')

//REGRISTRATION VALIDATION
const validUser = register =>{

    const registerUser = Joi.object({

        username: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password: Joi.string().min(8).max(16).required(),
        confirmpassword: Joi.string().min(8).max(16).valid(Joi.ref('password')).required(),
        address: Joi.string().min(10).max(255).required(),
        userpincode: Joi.string().length(6).required()
    
    })
    return registerUser.validate(register)
} 

//LOGIN VALIDATION
const validLogin = login => {

    const loginUser = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required()     
    })

    return loginUser.validate(login)
}

module.exports.validUser = validUser
module.exports.validLogin = validLogin
