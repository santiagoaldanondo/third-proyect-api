const mongoose = require('mongoose')
const Treatment = require('./../models/treatment.model')

module.exports.treatment = (treatment) => {
    return Treatment.findById(treatment)
}

module.exports.getTreatments = (authUser) => {
    return Treatment.find({ account: authUser.account })
}

module.exports.createTreatment = (data, authUser) => {
    data.account = authUser.account
    return Treatment.create(data)
}

module.exports.updateTreatment = (data, authUser) => {
    data.account = authUser.account
    return Treatment.findByIdAndUpdate(data._id, data, { new: true })
}

