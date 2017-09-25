const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

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

UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) { return next(err); }
        else {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) { return next(err); }
                else {
                    user.password = hash;
                    return next();
                }
            })
        }
    })
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", UserSchema);
module.exports = User;