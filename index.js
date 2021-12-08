// HashValue - $2a$10$NMTz5wHQTpNXXAfLzNmuFebUl4sW7l4OQhXkQHd0d/jH/VqVSCCt. StringPassword - user8password

//IMPORTING FILES
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

//CREATING PORT
port = process.env.PORT || 3000

//IMPORTING ROUTES
// const orderRoute = require('./routes/orderRoute.js')
const userRoute = require('./userRoute')

//MIDDLEWARE
app.use(express.json())
    // app.use('/orderPage', orderRoute)
app.use('/userPage', userRoute)

//ROUTES
app.get('/', (req, res) => {
    res.send("Its Working")
})

//CONNECTING API TO DATABASE
try {
    mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true },
            console.log("Connection Established"))
        // mongoose.connect('url')
} catch (err) {
    console.log(err)
}

app.listen(port)