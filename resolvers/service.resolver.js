const mongoose = require('mongoose')
const Service = require('./../models/service.model')

module.exports.service = (service) => {
    return Service.findById(service)
}

module.exports.getServices = (authUser) => {
    return Service.find({ account: authUser.account })
}

module.exports.createService = (data, user) => {
    data.account = user.account
    return Service.create(data)
}

module.exports.updateService = (data, user) => {
    data.account = user.account
    return Service.findByIdAndUpdate(data._id, data, { new: true })
}

