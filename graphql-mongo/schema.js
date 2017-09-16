const graphqlTools = require('graphql-tools')
const schema = `
type Author {
  _id: String
  firstName: String
  lastName: String
  posts: [Post]
}
type Post {
  _id: String
  title: String
  text: String
  views: Int
  author: Author
}
type Query {
  author(firstName: String, lastName: String): Author
}
`;
const resolvers = [];

const executableSchema = graphqlTools.makeExecutableSchema({
    typeDefs: schema,
    resolvers,
});

module.exports = executableSchema