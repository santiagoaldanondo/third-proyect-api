const mongoose = require('mongoose')
const User = require('./../models/user.model')

module.exports.signup = (newUser) => {
    return User.create(newUser)
}

module.exports.getUsers = () => {
    return User.find()
}