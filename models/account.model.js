const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = Schema({
    description: {
        type: String,
        required: [true, "A description is required"]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
        timestamps: true
    });

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;