module.exports.type = `
type Service {
    _id: ID
    branch: String
    code: String
    description: String!
    account: Account!
}
`

module.exports.query = `
    getServices: [Service]
`
module.exports.mutation = `
    createService(branch: String, code: String, description: String!): Service
    updateService(_id: ID!, branch: String, code: String, description: String!): Service
`
