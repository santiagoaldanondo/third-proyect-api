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
const { requiresAuth, requiresAdmin } = require('./../auth/permissions')

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub()

const TIMETABLE_ADDED = 'TIMETABLE_ADDED'
const CLIENT_ADDED = 'CLIENT_ADDED'

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
        owner: async ({ owner }, data, { dataloaders }) => await dataloaders.userLoader.load(owner)
    },
    Client: {
        account: async ({ account }) => await AccountR.account(account),
        insurance: async ({ insurance }, data, { dataloaders }) => await dataloaders.insuranceLoader.load(insurance)
    },
    Insurance: {
        account: async ({ account }) => await AccountR.account(account)
    },
    Pricing: {
        account: async ({ account }) => await AccountR.account(account),
        insurance: async ({ insurance }, data, { dataloaders }) => await dataloaders.insuranceLoader.load(insurance),
        treatment: async ({ treatment }, data, { dataloaders }) => await dataloaders.treatmentLoader.load(treatment)
    },
    Treatment: {
        account: async ({ account }) => await AccountR.account(account)
    },
    Timetable: {
        account: async ({ account }) => await AccountR.account(account),
        treatment: async ({ treatment }, data, { dataloaders }) => {
            return treatment ? await dataloaders.treatmentLoader.load(treatment) : undefined // dataloader does not accept undefined
        },
        client: async ({ client }, data, { dataloaders }) => {
            return client ? await dataloaders.clientLoader.load(client) : undefined // dataloader does not accept undefined
        },
        user: async ({ user }, data, { dataloaders }) => {
            return user ? await dataloaders.userLoader.load(user) : undefined // dataloader does not accept undefined
        }
    },
    User: {
        account: async ({ account }) => await AccountR.account(account)
    },
    Query: {
        getClients: compose(requiresAuth)(
            async (root, data, { authAccount }) => await ClientR.getClients(authAccount)),
        getTimetables: compose(requiresAuth)(
            async (root, data, { authAccount }) => await TimetableR.getTimetables(authAccount)),
        getInsurances: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authAccount }) => await InsuranceR.getInsurances(authAccount)),
        getTreatments: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authAccount }) => await TreatmentR.getTreatments(authAccount)),
        getPricings: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authAccount }) => await PricingR.getPricings(authAccount)),
        getUsers: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authAccount }) => await UserR.getUsers(authAccount))
    },
    Mutation: {
        register: async (root, data, { JWT_SECRET }) => await UserR.register(data, JWT_SECRET),
        login: async (root, data, { JWT_SECRET }) => await UserR.login(data, JWT_SECRET),
        resetPassword: compose(requiresAuth)(
            async (root, data, { authUser, JWT_SECRET }) => await UserR.resetPassword(data, authUser, JWT_SECRET)),
        createClient: compose(requiresAuth)(
            async (root, data, { authAccount }) => {
                const clientAdded = await ClientR.createClient(data, authAccount)
                pubsub.publish(CLIENT_ADDED, { clientAdded });
                return clientAdded
            }),
        updateClient: compose(requiresAuth)(
            async (root, data, { authAccount }) => await ClientR.updateClient(data, authAccount)),
        updateTimetable: compose(requiresAuth)(
            async (root, data, { authAccount }) => await TimetableR.updateTimetable(data, authAccount)),
        createTimetable: compose(requiresAuth)(
            async (root, data, { authAccount }) => {
                const timetableAdded = await TimetableR.createTimetable(data, authAccount)
                pubsub.publish(TIMETABLE_ADDED, { timetableAdded });
                return timetableAdded
            }),
        addToAccount: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authAccount }) => await UserR.addToAccount(data, authAccount)),
        updateUser: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authUser, JWT_SECRET }) => await UserR.updateUser(data, authUser, JWT_SECRET)),
        createInsurance: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authAccount }) => await InsuranceR.createInsurance(data, authAccount)),
        updateInsurance: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authAccount }) => await InsuranceR.updateInsurance(data, authAccount)),
        createTreatment: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authAccount }) => await TreatmentR.createTreatment(data, authAccount)),
        updateTreatment: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authAccount }) => await TreatmentR.updateTreatment(data, authAccount)),
        createPricing: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authAccount }) => await PricingR.createPricing(data, authAccount)),
        updatePricing: compose(requiresAuth, requiresAdmin)(
            async (root, data, { authAccount }) => await PricingR.updatePricing(data, authAccount)),
    },
    Subscription: {
        timetableAdded: {
            subscribe: () => pubsub.asyncIterator(TIMETABLE_ADDED),
        },
        clientAdded: {
            subscribe: () => pubsub.asyncIterator(CLIENT_ADDED),
        },
    },
};

module.exports = resolvers;