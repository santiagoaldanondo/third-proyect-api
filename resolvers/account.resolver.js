const AccountResolver = require('./account.resolver')

const prepare = (object) => {
    object._id = object._id.toString()
    return object
}

const resolvers = {
    Mutation: {
        createAccount: (root, data) => {
            return AccountResolver.create(data.newAccount)
                .then(account => account)
                .catch(error => error)
        }
    },
};

module.exports = resolvers;