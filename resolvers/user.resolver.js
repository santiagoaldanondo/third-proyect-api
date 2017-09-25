const mongoose = require('mongoose')
const User = require('./../models/user.model')
const jsonwebtoken = require('jsonwebtoken')
const _ = require('lodash')

module.exports.register = (data) => {
    return User.create(data)
}

module.exports.login = async (data, { JWT_SECRET }) => {
    let user = new User
    user = await User.findOne({ email: data.email })
    if (!user) {
        throw new Error("Email or password are not correct")
    } else {
        const passwordOk = await user.checkPassword(data.password)
        if (!passwordOk) {
            throw new Error("Email or password are not correct")
        } else {
            const token = jsonwebtoken.sign(
                {
                    user: _.pick(user, ['id', 'account'])
                },
                JWT_SECRET
                , {
                    expiresIn: '1d'
                }
            )
            return token
        }
    }
}

module.exports.getUsers = () => {
    return User.find()
}