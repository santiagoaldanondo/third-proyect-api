module.exports.type = `
type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    account: Account!
}
`

module.exports.query = `
    getUsers: [User]
`
module.exports.mutation = `
    register(firstName: String!, lastName: String! email: String!, password: String!,
        description: String!): String
    login(email: String!, password: String!): String
    addToaccount(firstName: String!, lastName: String! email: String!, password: String!): User
    resetPassword(oldPassword: String!, newPassword: String!): User
`
