const graphqlTools = require('graphql-tools')
const userSchema = require('./user.schema')
const resolvers = require('./../resolvers')

const typeDefs = `
${userSchema.type}
type Query {
${userSchema.query}
}
type Mutation {
${userSchema.mutation}  
}
`;

const executableSchema = graphqlTools.makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = executableSchema