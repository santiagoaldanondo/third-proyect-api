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
            async (root, data, { authAccount }) => await ClientR.getClients(authAccount)),
        getInsurances: compose(requiresAuth)(
            async (root, data, { authAccount }) => await InsuranceR.getInsurances(authAccount)),
        getTreatments: compose(requiresAuth)(
            async (root, data, { authAccount }) => await TreatmentR.getTreatments(authAccount)),
        getTimetables: compose(requiresAuth)(
            async (root, data, { authAccount }) => await TimetableR.getTimetables(authAccount)),
        getPricings: compose(requiresAuth)(
            async (root, data, { authAccount }) => await PricingR.getPricings(authAccount)),
        getUsers: compose(requiresAuth)(
            async (root, data, { authAccount }) => await UserR.getUsers(authAccount))
    },
    Mutation: {
        register: async (root, data, { JWT_SECRET }) => await UserR.register(data, JWT_SECRET),
        login: async (root, data, { JWT_SECRET }) => await UserR.login(data, JWT_SECRET),
        addToAccount: compose(requiresAuth)(
            async (root, data, { authAccount }) => await UserR.addToAccount(data, authAccount)),
        resetPassword: compose(requiresAuth)(
            async (root, data, { authUser }) => await UserR.resetPassword(data, authUser)),
        updateUser: compose(requiresAuth)(
            async (root, data, { authUser }) => await UserR.updateUser(data, authUser)),
        createClient: compose(requiresAuth)(
            async (root, data, { authAccount }) => await ClientR.createClient(data, authAccount)),
        updateClient: compose(requiresAuth)(
            async (root, data, { authAccount }) => await ClientR.updateClient(data, authAccount)),
        createInsurance: compose(requiresAuth)(
            async (root, data, { authAccount }) => await InsuranceR.createInsurance(data, authAccount)),
        updateInsurance: compose(requiresAuth)(
            async (root, data, { authAccount }) => await InsuranceR.updateInsurance(data, authAccount)),
        createTreatment: compose(requiresAuth)(
            async (root, data, { authAccount }) => await TreatmentR.createTreatment(data, authAccount)),
        updateTreatment: compose(requiresAuth)(
            async (root, data, { authAccount }) => await TreatmentR.updateTreatment(data, authAccount)),
        createTimetable: compose(requiresAuth)(
            async (root, data, { authAccount }) => await TimetableR.createTimetable(data, authAccount)),
        updateTimetable: compose(requiresAuth)(
            async (root, data, { authAccount }) => await TimetableR.updateTimetable(data, authAccount)),
        createPricing: compose(requiresAuth)(
            async (root, data, { authAccount }) => await PricingR.createPricing(data, authAccount)),
        updatePricing: compose(requiresAuth)(
            async (root, data, { authAccount }) => await PricingR.updatePricing(data, authAccount)),
    },
};

module.exports = resolvers;