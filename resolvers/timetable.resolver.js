const mongoose = require('mongoose')
const Timetable = require('./../models/timetable.model')

module.exports.timetable = (timetable) => {
    return Timetable.findById(timetable)
}

module.exports.getTimetables = (authUser) => {
    return Timetable.find({ account: authUser.account })
}

module.exports.createTimetable = async (data, authUser) => {
    // Missing verification that client, treatment and authUser correspond to the same account
    data.account = authUser.account
    return Timetable.create(data)
}

module.exports.updateTimetable = async (data, authUser) => {
    // Missing verification that client, treatment and authUser correspond to the same account
    data.account = authUser.account
    return Timetable.findByIdAndUpdate(data._id, data, { new: true })
}

