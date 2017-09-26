module.exports.type = `
type Insurance {
    _id: ID
    name: String!
    account: Account!
}
`

module.exports.query = `
    getInsurances: [Insurance]
`
module.exports.mutation = `
    createInsurance(name: String!): Insurance
    updateInsurance(_id: ID!, name: String!): Insurance
`
