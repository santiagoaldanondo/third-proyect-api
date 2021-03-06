const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PricingSchema = Schema({
    treatment: {
        type: Schema.Types.ObjectId,
        ref: "Treatment",
        required: [true, "A treatment is required"]
    },
    insurance: {
        type: Schema.Types.ObjectId,
        ref: "Insurance",
        required: [true, "An insurance is required"]
    },
    price: {
        type: Number,
        required: [true, "A price is required"]
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    }
}, {
        timestamps: true
    });

const Pricing = mongoose.model("Pricing", PricingSchema);
module.exports = Pricing;