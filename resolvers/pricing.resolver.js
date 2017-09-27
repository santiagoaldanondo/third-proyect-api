const mongoose = require('mongoose')
const Pricing = require('./../models/pricing.model')

module.exports.pricing = (pricing) => {
    return Pricing.findById(pricing)
}

module.exports.getPricings = (authUser) => {
    return Pricing.find({ account: authUser.account })
}

module.exports.createPricing = async (data, user) => {
    // Missing verification that insurance and service correspond to the same account
    data.account = user.account
    return Pricing.create(data)
}

module.exports.updatePricing = async (data, user) => {
    // Missing verification that insurance and service correspond to the same account
    data.account = user.account
    return Pricing.findByIdAndUpdate(data._id, data, { new: true })
}

