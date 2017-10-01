module.exports.type = `
type Timetable {
    _id: ID
    date: Date!
    notes: String
    info: String
    client: Client
    treatment: Treatment
    user: User
    account: Account
}
`

module.exports.query = `
    getTimetables: [Timetable]
`
module.exports.mutation = `
    createTimetable(date: Date!, notes: String, info: String, client: ID,
        treatment: ID, user: ID): Timetable
    updateTimetable(_id: ID!, date: Date!, notes: String, info: String, client: ID,
        treatment: ID, user: ID): Timetable
`
