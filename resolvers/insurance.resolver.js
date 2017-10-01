const mongoose = require('mongoose')
const Insurance = require('./../models/insurance.model')

module.exports.insurance = (insurance) => {
    return Insurance.findById(insurance)
}

module.exports.getInsurances = (authUser) => {
    return Insurance.find({ account: authUser.account })
}

module.exports.createInsurance = (data, authUser) => {
    data.account = authUser.account
    return Insurance.create(data)
}

module.exports.updateInsurance = (data, authUser) => {
    data.account = authUser.account
    return Insurance.findByIdAndUpdate(data._id, data, { new: true })
}

