module.exports.type = `
type Treatment {
    _id: ID
    branch: String
    code: String
    description: String!
    account: Account!
}
`

module.exports.query = `
    getTreatments: [Treatment]
`
module.exports.mutation = `
    createTreatment(branch: String, code: String, description: String!): Treatment
    updateTreatment(_id: ID!, branch: String, code: String, description: String!): Treatment
`
