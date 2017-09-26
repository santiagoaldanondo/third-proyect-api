const UserResolver = require('./user.resolver')
const AccountResolver = require('./account.resolver')
const { requiresAuth, requiresAdmin } = require('./../auth/permissions')

const prepare = (object) => {
    object._id = object._id.toString()
    return object
}

const resolvers = {
    User: {
        account: async ({ account }) => {
            return await UserResolver.account(account);
        },
    },
    Account: {
        owner: async ({ owner }) => {
            return await AccountResolver.owner(owner);
        },
    },
    Query: {
        getUsers: requiresAuth.createResolver(async (root, data, { user }) => {
            return await UserResolver.getUsers(user)
        })
    },
    Mutation: {
        register: async (root, data, context) => {
            console.log(data)
            return await UserResolver.register(data)
        },
        login: async (root, data, { JWT_SECRET }) => {
            return await UserResolver.login(data, JWT_SECRET)
        },
        addToaccount: async (root, data, { user }) => {
            return await UserResolver.addToAccount(data, user)
        },
        resetPassword: async (root, data, { user }) => {
            return await UserResolver.resetPassword(data, user)
        },
    },
};

module.exports = resolvers;