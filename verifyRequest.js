const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    const token = req.header('webToken')
    if(!token) return res.send('Access denied')

    try{
        const verified  = jwt.verify(token, process.env.PRIVATE_TOKEN)
        req.userCollection = verified
        next()
    }catch(err){
        res.send(err)
    }
}