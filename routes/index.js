const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const port = require('./../configs/port.config')
const schema = require('./../schema')
// const buildDataloaders = require('./../dataloaders');
const formatError = require('./../formatError');
const mongo = require('./../configs/db.config')
const JWT_SECRET = process.env.JWT_SECRET

const buildOptions = (req, res) => {
    // const user = await authenticate(req, mongo.Users);
    return {
        context: {
            JWT_SECRET,
            authUser: req.authUser
            // dataloaders: buildDataloaders(),
        }, // This context object is passed to all resolvers.
        formatError,
        schema,
    };
};

router.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));
router.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    // passHeader: `'Authorization': 'bearer token-foo@bar.com'`,
    subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`,
}));


router.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

module.exports = router;
