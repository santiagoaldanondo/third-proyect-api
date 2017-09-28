const jsonwebtoken = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const authorization = async (req, res, next) => {
    const token = req.headers.authorization
    console.log(token)
    try {
        const { authUser } = await jsonwebtoken.verify(token, JWT_SECRET)
        req.authUser = authUser
    } catch (err) {
        console.log("jwt not verified")
    }
    next()
}

module.exports = authorization