const mongoose = require('mongoose')
const Treatment = require('./../models/treatment.model')

module.exports.treatment = (treatment) => {
    return Treatment.findById(treatment)
}

module.exports.getTreatments = (authAccount) => {
    return Treatment.find({ account: authAccount._id })
}

module.exports.createTreatment = (data, authAccount) => {
    data.account = authAccount._id
    return Treatment.create(data)
}

module.exports.updateTreatment = (data, authAccount) => {
    data.account = authAccount._id
    return Treatment.findByIdAndUpdate(data._id, data, { new: true })
}

