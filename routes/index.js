const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const port = require('./../configs/port.config')
const schema = require('./../schema')
const dataloaders = require('./../dataloaders');
const formatError = require('./../formatError');
const mongo = require('./../configs/db.config')
const JWT_SECRET = process.env.JWT_SECRET

console.log(dataloaders)

const buildOptions = (req, res) => {
    return {
        context: {
            JWT_SECRET,
            authUser: req.authUser,
            authAccount: req.authAccount,
            dataloaders: dataloaders,
        },
        formatError,
        schema,
    };
};

router.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));
router.use('/graphiql', graphiqlExpress({
    endpointURL: '/api/graphql',
    subscriptionsEndpoint: `ws://localhost:3000/api/subscriptions`,
}));

module.exports = router;
