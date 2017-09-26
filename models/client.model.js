const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ClientSchema = Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String
    },
    phone: {
        type: String,
        unique: true
    },
    insuranceNumber: {
        type: String
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
    },
    insurance: {
        type: Schema.Types.ObjectId,
        ref: "Insurance",
        required: [true, "A client must have an insurance"]
    }
}, {
        timestamps: true
    });

ClientSchema.plugin(uniqueValidator);

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;