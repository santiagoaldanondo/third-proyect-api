const jsonwebtoken = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const authorization = async (req, res, next) => {
    const token = req.headers.authorization
    try {
        const { user } = await jsonwebtoken.verify(token, JWT_SECRET)
        req.user = user
    } catch (err) {
        console.log("jwt not verified")
    }
    next()
}

module.exports = authorization