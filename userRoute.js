const express = require('express')
const router = express.Router()
const userCollection = require('./userSchema')
const { validUser, validLogin } = require('./validation.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//IMPORTING TOKEN VERIFICATION FILE
const verifyRequest = require('./verifyRequest')

//POST REQUEST
//post request for registration of new user
router.post('/register', async(req, res) => {

        //VALIDATING USER
        const { error } = validUser(req.body)
        if (error) return res.send(error)

        //CHECKING FOR "if user exist"
        const userExist = await userCollection.findOne({ email: req.body.email })
        if (userExist) return res.json({ user: "User Exist" })

        //HASHING PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new userCollection({

            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: hashPassword,
            confirmpassword: hashPassword,
            address: req.body.address,
            userpincode: req.body.userpincode

        })
        try {
            const savedUser = await newUser.save()
            res.json(savedUser)
        } catch (err) {
            console.log(err)
        }
    })
    //post request for login
router.post('/login', async(req, res) => {

    //VALIDATING USER
    const { error } = validLogin(req.body)
    if (error) return res.send(error)

    //CHECKING FOR "if email exist"
    const userExist = await userCollection.findOne({ email: req.body.email })
        // res.send(emailExist)
    if (!userExist) return res.json({ user: "Incorrect EmailId" })

    //CHECKING FOR "if password exist"
    const passwordExist = await bcrypt.compare(req.body.password, userExist.password)
    if (!passwordExist) return res.json({ user: "Incorrect Password" })
        // res.json({loginStatus: passwordExist})

    //CREATING TOKENS
    const token = jwt.sign({ _id: userExist._id }, process.env.PRIVATE_TOKEN)
        // res.json(token)
    res.header('webToken', token).send(token)

})

//GET REQUEST
router.get('/:id', verifyRequest, async(req, res) => {
    const getUser = await userCollection.findOne({ _id: req.params.id })
    res.json(getUser)
})

//PATCH REQUEST
router.patch('/:id', (req, res) => {

        userCollection.findOneAndUpdate({ _id: req.params.id }, {

                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
                address: req.body.address,
                userpincode: req.body.userpincode,
                buyer: req.body.buyer
            },
            (err) => {
                if (err) {
                    res.json(err)
                } else {
                    res.json({ updatestatus: "Successful" })
                }
            })
    })
    //DELETE REQUEST
router.delete('/:id', (req, res, next) => {
    userCollection.findByIdAndDelete({ _id: req.params.id },
        (err) => {
            if (err) {
                res.json(err)
            } else {
                res.json({ "deleteStatus": "Deleted" })
            }
        })
})

module.exports = router

/*

    {
    "username":"user10",
    "email":"user10@gmail.com",
    "phone":"1234576890",
    "password":"user10pass",
    "confirmpassword":"user10pass",
    "address":"geetanjali bgdchdyg hdyfgyubnv hguydgfeb",
    "userpincode":"422101"
}

*/