module.exports.type = `
type User {
    _id: String
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    account: Account!
}
`

module.exports.query = `
    getUsers: [User]
    getUser(_id: String): User
`
module.exports.mutation = `
    register(firstName: String!, lastName: String! email: String!, password: String!, description: String!): User
    login(email: String!, password: String!): String
    addToaccount(firstName: String!, lastName: String! email: String!, password: String!): User
    resetPassword(oldPassword: String!, newPassword: String!): User
`
