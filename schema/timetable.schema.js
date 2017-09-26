module.exports.type = `
type Timetable {
    _id: ID
    date: Date!
    notes: String
    info: String
    client: Client
    service: Service
    user: User
    account: Account
}
`

module.exports.query = `
    getTimetables: [Timetable]
`
module.exports.mutation = `
    createTimetable(date: Date!, notes: String, info: String, client: ID,
        service: ID, user: ID, account: ID): Timetable
    updateTimetable(_id: ID!, date: Date!, notes: String, info: String, client: ID,
        service: ID, user: ID, account: ID): Timetable
`
