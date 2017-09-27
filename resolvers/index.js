const graphql = require('graphql');
const moment = require('moment');
// const language = require('graphql/language');
const AccountR = require('./account.resolver')
const ClientR = require('./client.resolver')
const InsuranceR = require('./insurance.resolver')
const PricingR = require('./pricing.resolver')
const ServiceR = require('./service.resolver')
const TimetableR = require('./timetable.resolver')
const UserR = require('./user.resolver')
const { requiresAuth, requiresAdmin } = require('./../auth/permissions')

const prepare = (object) => {
    object._id = object._id.toString()
    return object
}

const resolvers = {
    Date: {
        __parseValue(value) {
            return new Date(value); // value from the client
        },
        __serialize(value) {
            return new Date(value); // value sent to the client
        },
        __parseLiteral(ast) {
            return ast.value
        }
    },
    Account: {
        owner: async ({ owner }) => await UserR.owner(owner)
    },
    Client: {
        account: async ({ account }) => await AccountR.account(account),
        insurance: async ({ insurance }) => await InsuranceR.insurance(insurance)
    },
    Insurance: {
        account: async ({ account }) => await AccountR.account(account)
    },
    Pricing: {
        account: async ({ account }) => await AccountR.account(account),
        insurance: async ({ insurance }) => await InsuranceR.insurance(insurance),
        service: async ({ service }) => await ServiceR.service(service)
    },
    Service: {
        account: async ({ account }) => await AccountR.account(account)
    },
    Timetable: {
        account: async ({ account }) => await AccountR.account(account),
        service: async ({ service }) => await ServiceR.service(service),
        client: async ({ client }) => await ClientR.client(client),
        user: async ({ user }) => await UserR.user(user)
    },
    User: {
        account: async ({ account }) => await AccountR.account(account)
    },
    Query: {
        getClients: async (root, data, { authUser }) => await ClientR.getClients(authUser),
        getInsurances: async (root, data, { authUser }) => await InsuranceR.getInsurances(authUser),
        getServices: async (root, data, { authUser }) => await ServiceR.getServices(authUser),
        getTimetables: async (root, data, { authUser }) => await TimetableR.getTimetables(authUser),
        getPricings: async (root, data, { authUser }) => await PricingR.getPricings(authUser),
        getUsers: async (root, data, { authUser }) => await UserR.getUsers(authUser),
    },
    Mutation: {
        createClient: async (root, data, { authUser }) => await ClientR.createClient(data, authUser),
        updateClient: async (root, data, { authUser }) => await ClientR.updateClient(data, authUser),
        createInsurance: async (root, data, { authUser }) => await InsuranceR.createInsurance(data, authUser),
        updateInsurance: async (root, data, { authUser }) => await InsuranceR.updateInsurance(data, authUser),
        createService: async (root, data, { authUser }) => await ServiceR.createService(data, authUser),
        updateService: async (root, data, { authUser }) => await ServiceR.updateService(data, authUser),
        createTimetable: async (root, data, { authUser }) => await TimetableR.createTimetable(data, authUser),
        updateTimetable: async (root, data, { authUser }) => await TimetableR.updateTimetable(data, authUser),
        createPricing: async (root, data, { authUser }) => await PricingR.createPricing(data, authUser),
        updatePricing: async (root, data, { authUser }) => await PricingR.updatePricing(data, authUser),
        register: async (root, data, context) => await UserR.register(data),
        login: async (root, data, { JWT_SECRET }) => await UserR.login(data, JWT_SECRET),
        addToaccount: async (root, data, { authUser }) => await UserR.addToAccount(data, authUser),
        resetPassword: async (root, data, { authUser }) => await UserR.resetPassword(data, authUser),
    },
};

module.exports = resolvers;