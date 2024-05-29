const jwt = require("jsonwebtoken")
const errorHandler = require("./error")


const protectPage = (req, res, next)=>{

    const token = req.cookies.jwt
    const secreteCode = "ishola360";
    if(!token) return next(errorHandler(500, "You're unauthoried"))


    if(token)(
        jwt.verify(token, secreteCode, (err, user)=>{
            if(err) return next(errorHandler(500, "Wrong authorise code"))

            req.user = user
            next()
        })
    )
}

module.exports = protectPage