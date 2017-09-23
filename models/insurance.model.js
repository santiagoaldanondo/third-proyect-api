const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InsuranceSchema = Schema({
    name: {
        type: String,
        required: [true, "A name is required for insurance companies"]
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    }
}, {
        timestamps: true
    });

const Insurance = mongoose.model("Insurance", InsuranceSchema);
module.exports = Insurance;