const mongoose = require('mongoose')
const User = require('./../models/user.model')

module.exports.owner = (owner) => {
    return User.findById(owner)
}