const mongoose = require('mongoose')
const Insurance = require('./../models/insurance.model')

module.exports.insurance = (insurance) => {
    return Insurance.findById(insurance)
}

module.exports.getInsurances = (authAccount) => {
    return Insurance.find({ account: authAccount._id })
}

module.exports.createInsurance = (data, authAccount) => {
    data.account = authAccount._id
    return Insurance.create(data)
}

module.exports.updateInsurance = (data, authAccount) => {
    data.account = authAccount._id
    return Insurance.findByIdAndUpdate(data._id, data, { new: true })
}

