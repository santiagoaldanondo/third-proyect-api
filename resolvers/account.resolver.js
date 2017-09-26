const mongoose = require('mongoose')
const Account = require('./../models/account.model')

module.exports.account = (account) => {
    return Account.findById(account)
}
