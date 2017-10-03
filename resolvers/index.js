const compose = require('compose-function')
const graphql = require('graphql');
const moment = require('moment');
const AccountR = require('./account.resolver')
const ClientR = require('./client.resolver')
const InsuranceR = require('./insurance.resolver')
const PricingR = require('./pricing.resolver')
const TreatmentR = require('./treatment.resolver')
const TimetableR = require('./timetable.resolver')
const UserR = require('./user.resolver')
const requiresAuth = require('./../auth/permissions')

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
        treatment: async ({ treatment }) => await TreatmentR.treatment(treatment)
    },
    Treatment: {
        account: async ({ account }) => await AccountR.account(account)
    },
    Timetable: {
        account: async ({ account }) => await AccountR.account(account),
        treatment: async ({ treatment }) => await TreatmentR.treatment(treatment),
        client: async ({ client }) => await ClientR.client(client),
        user: async ({ user }) => await UserR.user(user)
    },
    User: {
        account: async ({ account }) => await AccountR.account(account)
    },
    Query: {
        getClients: compose(requiresAuth)(
            async (root, data, { authUser }) => await ClientR.getClients(authUser)),
        getInsurances: compose(requiresAuth)(
            async (root, data, { authUser }) => await InsuranceR.getInsurances(authUser)),
        getTreatments: compose(requiresAuth)(
            async (root, data, { authUser }) => await TreatmentR.getTreatments(authUser)),
        getTimetables: compose(requiresAuth)(
            async (root, data, { authUser }) => await TimetableR.getTimetables(authUser)),
        getPricings: compose(requiresAuth)(
            async (root, data, { authUser }) => await PricingR.getPricings(authUser)),
        getUsers: compose(requiresAuth)(
            async (root, data, { authUser }) => await UserR.getUsers(authUser))
    },
    Mutation: {
        register: async (root, data, { JWT_SECRET }) => await UserR.register(data, JWT_SECRET),
        login: async (root, data, { JWT_SECRET }) => await UserR.login(data, JWT_SECRET),
        addToAccount: compose(requiresAuth)(
            async (root, data, { authUser }) => await UserR.addToAccount(data, authUser)),
        resetPassword: compose(requiresAuth)(
            async (root, data, { authUser }) => await UserR.resetPassword(data, authUser)),
        updateUser: compose(requiresAuth)(
            async (root, data, { authUser }) => await UserR.updateUser(data, authUser)),
        createClient: compose(requiresAuth)(
            async (root, data, { authUser }) => await ClientR.createClient(data, authUser)),
        updateClient: compose(requiresAuth)(
            async (root, data, { authUser }) => await ClientR.updateClient(data, authUser)),
        createInsurance: compose(requiresAuth)(
            async (root, data, { authUser }) => await InsuranceR.createInsurance(data, authUser)),
        updateInsurance: compose(requiresAuth)(
            async (root, data, { authUser }) => await InsuranceR.updateInsurance(data, authUser)),
        createTreatment: compose(requiresAuth)(
            async (root, data, { authUser }) => await TreatmentR.createTreatment(data, authUser)),
        updateTreatment: compose(requiresAuth)(
            async (root, data, { authUser }) => await TreatmentR.updateTreatment(data, authUser)),
        createTimetable: compose(requiresAuth)(
            async (root, data, { authUser }) => await TimetableR.createTimetable(data, authUser)),
        updateTimetable: compose(requiresAuth)(
            async (root, data, { authUser }) => await TimetableR.updateTimetable(data, authUser)),
        createPricing: compose(requiresAuth)(
            async (root, data, { authUser }) => await PricingR.createPricing(data, authUser)),
        updatePricing: compose(requiresAuth)(
            async (root, data, { authUser }) => await PricingR.updatePricing(data, authUser)),
    },
};

module.exports = resolvers;