module.exports.type = `
type Pricing {
    _id: ID
    price: Float!
    service: Service!
    insurance: Insurance!
    account: Account!
}
`

module.exports.query = `
    getPricings: [Pricing]
`
module.exports.mutation = `
    createPricing(price: Float!, service: ID!, insurance: ID!): Pricing
    updatePricing(_id: ID!, price: Float!, service: ID!, insurance: ID!): Pricing
`
