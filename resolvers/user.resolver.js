const mongoose = require('mongoose')
const User = require('./../models/user.model')
const Account = require('./../models/account.model')
const jsonwebtoken = require('jsonwebtoken')
const _ = require('lodash')

module.exports.account = (account) => {
    return Account.findById(account)
}

module.exports.getUsers = (user) => {
    return User.find({ account: user.account })
}

module.exports.register = async (data) => {
    const newUser = await User.create(_.pick(data, ['firstName', 'lastName', 'email', 'password']))
    data.owner = newUser._id
    const newAccount = await Account.create(_.pick(data, ['description', 'owner']))
    newUser.account = newAccount._id
    return User.findByIdAndUpdate(newUser._id, newUser, { new: true })

}

module.exports.login = async (data, JWT_SECRET) => {
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
                    user: _.pick(user, ['_id', 'account'])
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

module.exports.addToAccount = async (data, user) => {
    data.account = user.account
    return await User.create(data)
}

module.exports.resetPassword = async (data, user) => {
    // console.log(user)
    const dbUser = await User.findById(user._id)
    const passwordOk = await dbUser.checkPassword(data.oldPassword)
    if (!passwordOk) {
        throw new Error("Old password is not correct")
    } else {
        dbUser.password = data.newPassword
        return dbUser.save()
    }
}
