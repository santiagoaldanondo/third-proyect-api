const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
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