module.exports.type = `
type User {
    _id: String
    firstName: String!
    lastName: String!
    email: String!
    password: String!
}
`

module.exports.query = `
    getUsers: [User]
    getUser(_id: String): User
`
module.exports.mutation = `
    register(firstName: String!, lastName: String! email: String!, password: String!): User
    login(email: String!, password: String!): String
`
