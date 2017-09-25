const UserResolver = require('./user.resolver')
const { requiresAuth, requiresAdmin } = require('./../auth/permissions')

const prepare = (object) => {
    object._id = object._id.toString()
    return object
}

const resolvers = {
    Query: {
        getUsers: requiresAuth.createResolver(async (root, data, context) => {
            return UserResolver.getUsers()
        })
    },
    Mutation: {
        register: async (root, data, context) => {
            return await UserResolver.register(data)
        },
        login: async (root, data, context) => {
            return await UserResolver.login(data, { JWT_SECRET })
        }
    },
};

module.exports = resolvers;