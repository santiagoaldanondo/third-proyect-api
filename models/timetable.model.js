const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimetableSchema = Schema({
    date: {
        type: Date,
        required: [true, "Date an time are required"]
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    treatment: {
        type: Schema.Types.ObjectId,
        ref: "Treatment"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },
    notes: {
        type: String
    },
    info: {
        type: String
    }
}, {
        timestamps: true
    });

const Timetable = mongoose.model("Timetable", TimetableSchema);
module.exports = Timetable;