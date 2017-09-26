const mongoose = require('mongoose')
const Client = require('./../models/client.model')

module.exports.client = (client) => {
    return Client.findById(client)
}

module.exports.getClients = (authUser) => {
    return Client.find({ account: authUser.account })
}

module.exports.createClient = async (data, user) => {
    // Missing verification that insurance corresponds to the same account
    data.account = user.account
    return Client.create(data)
}

module.exports.updateClient = async (data, user) => {
    // Missing verification that insurance corresponds to the same account
    data.account = user.account
    return Client.findByIdAndUpdate(data._id, data, { new: true })
}

