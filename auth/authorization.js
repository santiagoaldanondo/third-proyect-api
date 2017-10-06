const jsonwebtoken = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const authorization = async (req, res, next) => {
    const token = req.headers.authorization
    try {
        const { authUser, authAccount } = await jsonwebtoken.verify(token, JWT_SECRET)
        req.authUser = authUser
        req.authAccount = authAccount.account
    } catch (err) {
        console.log("jwt not verified")
    }
    next()
}

module.exports = authorization