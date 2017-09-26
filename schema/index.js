const graphqlTools = require('graphql-tools')
const accountSchema = require('./account.schema')
const userSchema = require('./user.schema')
const insuranceSchema = require('./insurance.schema')
const serviceSchema = require('./service.schema')
const clientSchema = require('./client.schema')
const pricingSchema = require('./pricing.schema')
const timetableSchema = require('./timetable.schema')
const resolvers = require('./../resolvers')

const typeDefs = `
scalar Date

  ${accountSchema.type}
  ${userSchema.type}
  ${insuranceSchema.type}
  ${serviceSchema.type}
  ${clientSchema.type}
  ${pricingSchema.type}
  ${timetableSchema.type}
type Query {
  ${userSchema.query}
  ${insuranceSchema.query}
  ${serviceSchema.query}
  ${clientSchema.query}
  ${pricingSchema.query}
  ${timetableSchema.query}
}
type Mutation {
  ${userSchema.mutation}  
  ${insuranceSchema.mutation}  
  ${serviceSchema.mutation}
  ${clientSchema.mutation}
  ${pricingSchema.mutation}
  ${timetableSchema.mutation} 
}
`;

const executableSchema = graphqlTools.makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = executableSchema