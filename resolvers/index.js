const graphql = require('graphql');
const language = require('graphql/language');
const AccountResolver = require('./account.resolver')
const UserResolver = require('./user.resolver')
const InsuranceResolver = require('./insurance.resolver')
const ServiceResolver = require('./service.resolver')
const ClientResolver = require('./client.resolver')
const { requiresAuth, requiresAdmin } = require('./../auth/permissions')

const prepare = (object) => {
    object._id = object._id.toString()
    return object
}

const resolvers = {
    Date: new graphql.GraphQLScalarType({ // From http://dev.apollodata.com
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === language.Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),
    Account: {
        owner: async ({ owner }) => {
            return await UserResolver.owner(owner);
        },
    },
    User: {
        account: async ({ account }) => {
            return await AccountResolver.account(account);
        },
    },
    Insurance: {
        account: async ({ account }) => {
            return await AccountResolver.account(account);
        },
    },
    Client: {
        account: async ({ account }) => {
            return await AccountResolver.account(account);
        },
    },
    Query: {
        getUsers: async (root, data, { authUser }) => {
            return await UserResolver.getUsers(authUser)
        },
        getInsurances: async (root, data, { authUser }) => {
            return await InsuranceResolver.getInsurances(authUser)
        },
        getServices: async (root, data, { authUser }) => {
            return await ServiceResolver.getServices(authUser)
        },
        getClients: async (root, data, { authUser }) => {
            return await ClientResolver.getClients(authUser)
        }
    },
    Mutation: {
        register: async (root, data, context) => {
            return await UserResolver.register(data)
        },
        login: async (root, data, { JWT_SECRET }) => {
            return await UserResolver.login(data, JWT_SECRET)
        },
        addToaccount: async (root, data, { authUser }) => {
            return await UserResolver.addToAccount(data, authUser)
        },
        resetPassword: async (root, data, { authUser }) => {
            return await UserResolver.resetPassword(data, authUser)
        },
        createInsurance: async (root, data, { authUser }) => {
            return await InsuranceResolver.createInsurance(data, authUser)
        },
        updateInsurance: async (root, data, { authUser }) => {
            return await InsuranceResolver.updateInsurance(data, authUser)
        },
        createService: async (root, data, { authUser }) => {
            return await ServiceResolver.createService(data, authUser)
        },
        updateService: async (root, data, { authUser }) => {
            return await ServiceResolver.updateService(data, authUser)
        },
        createClient: async (root, data, { authUser }) => {
            return await ClientResolver.createClient(data, authUser)
        },
        updateClient: async (root, data, { authUser }) => {
            return await ClientResolver.updateClient(data, authUser)
        },
    },
};

module.exports = resolvers;