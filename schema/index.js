const graphqlTools = require('graphql-tools')
const userSchema = require('./user.schema')
const accountSchema = require('./account.schema')
const resolvers = require('./../resolvers')

const typeDefs = `
  ${userSchema.type}
  ${accountSchema.type}
type Query {
  ${userSchema.query}
  ${accountSchema.query}
}
type Mutation {
  ${userSchema.mutation}  
  ${accountSchema.mutation}  
}
`;

const executableSchema = graphqlTools.makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = executableSchema