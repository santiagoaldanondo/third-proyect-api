const mongoose = require('mongoose')
const Client = require('./../models/client.model')

module.exports.client = (client) => {
    return Client.findById(client)
}

module.exports.getClients = (authAccount) => {
    return Client.find({ account: authAccount._id })
}

module.exports.createClient = async (data, authAccount) => {
    // Missing verification that insurance corresponds to the same account
    data.account = authAccount._id
    return Client.create(data)
}

module.exports.updateClient = async (data, authAccount) => {
    // Missing verification that insurance corresponds to the same account
    data.account = authAccount._id
    return Client.findByIdAndUpdate(data._id, data, { new: true })
}

