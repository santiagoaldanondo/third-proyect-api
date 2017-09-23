module.exports.type = `
type User {
    _id: String
    firstName: String
    lastName: String
    email: String
    password: String
}
input NewUser {
    firstName: String
    lastName: String
    email: String
    password: String
}
input LoginUser {
    email: String
    password: String
}
`

module.exports.query = `
    getUsers: [User]
    getUser(_id: String): User
`
module.exports.mutation = `
    signup(newUser: NewUser): User
    login(loginUser: LoginUser): User
`
