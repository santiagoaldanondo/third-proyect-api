const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    }
}, {
        timestamps: true
    });

const User = mongoose.model("User", UserSchema);
module.exports = User;