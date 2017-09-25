const jsonwebtoken = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const addUser = async (req, res, next) => {
    const token = req.headers.authorization
    try {
        const { user } = await jsonwebtoken.verify(token)
        req.user = user
    } catch (err) {
        console.log(err)
    }
    next()
}

module.exports = addUser