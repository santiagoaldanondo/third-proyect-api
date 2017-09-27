const mongoose = require('mongoose')
const Timetable = require('./../models/timetable.model')

module.exports.timetable = (timetable) => {
    return Timetable.findById(timetable)
}

module.exports.getTimetables = (authUser) => {
    return Timetable.find({ account: authUser.account })
}

module.exports.createTimetable = async (data, user) => {
    // Missing verification that client, service and user correspond to the same account
    data.account = user.account
    return Timetable.create(data)
}

module.exports.updateTimetable = async (data, user) => {
    // Missing verification that client, service and user correspond to the same account
    data.account = user.account
    return Timetable.findByIdAndUpdate(data._id, data, { new: true })
}

