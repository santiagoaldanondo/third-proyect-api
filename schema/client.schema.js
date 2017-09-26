module.exports.type = `
type Client {
    _id: ID
    firstName: String!
    lastName: String!
    email: String
    phone: String!
    insuranceNumber: String
    account: Account!
    insurance: Insurance!
}
`

module.exports.query = `
    getClients: [Client]
`
module.exports.mutation = `
    createClient(firstName: String!, lastName: String!, email: String,
        phone: String!, insuranceNumber: String, insurance: ID!): Client
    updateClient(_id: ID!, firstName: String!, lastName: String!, email: String,
        phone: String!, insuranceNumber: String, insurance: ID!): Client
`
