const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = Schema({
    branch: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    code: {
        type: String,
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    }
}, {
        timestamps: true
    });

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;