module.exports.type = `
type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    account: Account!
    isAdmin: Boolean!
}
`

module.exports.query = `
    getUsers: [User]
`
module.exports.mutation = `
    register(firstName: String!, lastName: String! email: String!, password: String!,
        description: String!): String
    login(email: String!, password: String!): String
    addToAccount(firstName: String!, lastName: String! email: String!, password: String!, 
        isAdmin: Boolean!): User
    resetPassword(oldPassword: String!, newPassword: String!): String
    updateUser(_id: String!, firstName: String!, lastName: String!, email: String!, 
        isAdmin: Boolean!): String
`
