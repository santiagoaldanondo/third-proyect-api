const express = require('express');
const router = express.Router();
const apolloServer = require('apollo-server-express')
const bodyParser = require('body-parser')
const schema = require('./../graphql-mongo/schema')

/* GET home page. */
router.use('/graphql', bodyParser.json(), apolloServer.graphqlExpress({ schema }));
router.use('/graphiql', apolloServer.graphiqlExpress({ endpointURL: '/graphql' }));

module.exports = router;
