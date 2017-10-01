module.exports.type = `
type Pricing {
    _id: ID
    price: Float!
    treatment: Treatment!
    insurance: Insurance!
    account: Account!
}
`

module.exports.query = `
    getPricings: [Pricing]
`
module.exports.mutation = `
    createPricing(price: Float!, treatment: ID!, insurance: ID!): Pricing
    updatePricing(_id: ID!, price: Float!, treatment: ID!, insurance: ID!): Pricing
`
