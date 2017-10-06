const mongoose = require('mongoose')
const User = require('./../models/user.model')
const Account = require('./../models/account.model')
const jsonwebtoken = require('jsonwebtoken')
const _ = require('lodash')

module.exports.owner = (owner) => {
    return User.findById(owner)
}

module.exports.user = (user) => {
    return User.findById(user)
}

module.exports.getUsers = (authAccount) => {
    return User.find({ account: authAccount._id })
}

module.exports.register = async (data, JWT_SECRET) => {
    let token = null
    const newUser = await User.create(_.pick(data, ['firstName', 'lastName', 'email', 'password']))
    data.owner = newUser._id
    const newAccount = await Account.create(_.pick(data, ['description', 'owner']))
    newUser.account = newAccount._id
    await User.findByIdAndUpdate(newUser._id, newUser, { new: true })
        .populate("account")
        .then(user => {
            token = jsonwebtoken.sign(
                {
                    authUser: _.pick(user, ['_id', 'firstName', 'lastName', 'email']),
                    authAccount: _.pick(user, ['account._id', 'account.description'])
                },
                JWT_SECRET
                , {
                    expiresIn: '1d'
                }
            )
        }).catch(err => console.log(err))
    return token
}

module.exports.login = async (data, JWT_SECRET) => {
    let user = new User
    user = await User.findOne({ email: data.email }).populate("account")
    if (!user) {
        throw new Error("Email or password are not correct")
    } else {
        const passwordOk = await user.checkPassword(data.password)
        if (!passwordOk) {
            throw new Error("Email or password are not correct")
        } else {
            const token = jsonwebtoken.sign(
                {
                    authUser: _.pick(user, ['_id', 'firstName', 'lastName', 'email']),
                    authAccount: _.pick(user, ['account._id', 'account.description'])
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

module.exports.addToAccount = (data, authAccount) => {
    data.account = authAccount._id
    return User.create(data)
}

module.exports.resetPassword = async (data, authUser) => {
    const dbUser = await User.findById(authUser._id)
    const passwordOk = await dbUser.checkPassword(data.oldPassword)
    if (!passwordOk) {
        throw new Error("Old password is not correct")
    } else {
        dbUser.password = data.newPassword
        return dbUser.save()
    }
}

module.exports.updateUser = async (data, authUser) => {
    if (data._id === authUser._id) {
        return User.findByIdAndUpdate(authUser._id, data, { new: true })
    }
    throw new Error("You cannot modify a different user")

}
