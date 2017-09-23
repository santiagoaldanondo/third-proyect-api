const UserResolver = require('./user.resolver')

const prepare = (object) => {
    object._id = object._id.toString()
    return object
}

const resolvers = {
    Query: {
        getUsers: (root, data) => {
            return UserResolver.getUsers()
                .then(users => users)
                .catch(error => error)
        }
    },
    Mutation: {
        signup: (root, data) => {
            return UserResolver.signup(data.newUser)
                .then(user => user)
                .catch(error => error)
        }
    },
};

module.exports = resolvers;