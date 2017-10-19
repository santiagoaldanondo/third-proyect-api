const DataLoader = require('dataloader');
const Insurances = require('./../models/insurance.model')
const Users = require('./../models/user.model')
const Treatments = require('./../models/treatment.model')
const Clients = require('./../models/client.model')

async function batchInsurances(keys) {
    return await Insurances.find({ '_id': { $in: keys } });
}

async function batchUsers(keys) {
    return await Users.find({ '_id': { $in: keys } });
}

async function batchTreatments(keys) {
    return await Treatments.find({ '_id': { $in: keys } });
}

async function batchClients(keys) {
    return await Clients.find({ '_id': { $in: keys } });
}

module.exports = {
    insuranceLoader: new DataLoader(keys => batchInsurances(keys), { cacheKeyFn: key => key.toString() }),
    userLoader: new DataLoader(keys => batchUsers(keys), { cacheKeyFn: key => key.toString() }),
    treatmentLoader: new DataLoader(keys => batchTreatments(keys), { cacheKeyFn: key => key.toString() }),
    clientLoader: new DataLoader(keys => batchClients(keys), { cacheKeyFn: key => key.toString() })
}
