const mongoose = require('mongoose')
const Timetable = require('./../models/timetable.model')

module.exports.timetable = (timetable) => {
    return Timetable.findById(timetable)
}

module.exports.getTimetables = (authAccount) => {
    return Timetable.find({ account: authAccount._id })
}

module.exports.createTimetable = async (data, authAccount) => {
    // Missing verification that client, treatment and authAccount correspond to the same account
    data.account = authAccount._id
    return Timetable.create(data)
}

module.exports.updateTimetable = async (data, authAccount) => {
    // Missing verification that client, treatment and authAccount correspond to the same account
    data.account = authAccount._id
    return Timetable.findByIdAndUpdate(data._id, data, { new: true })
}

