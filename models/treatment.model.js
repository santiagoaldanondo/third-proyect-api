const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TreatmentSchema = Schema({
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

const Treatment = mongoose.model("Treatment", TreatmentSchema);
module.exports = Treatment;