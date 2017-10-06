const mongoose = require('mongoose')
const Pricing = require('./../models/pricing.model')

module.exports.pricing = (pricing) => {
    return Pricing.findById(pricing)
}

module.exports.getPricings = (authAccount) => {
    return Pricing.find({ account: authAccount._id })
}

module.exports.createPricing = async (data, authAccount) => {
    // Missing verification that insurance and treatment correspond to the same account
    data.account = authAccount._id
    return Pricing.create(data)
}

module.exports.updatePricing = async (data, authAccount) => {
    // Missing verification that insurance and treatment correspond to the same account
    data.account = authAccount._id
    return Pricing.findByIdAndUpdate(data._id, data, { new: true })
}

