const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Quote {
    _id: ID!
    quote: String!
    authorId: String!
  }
  type Author {
    _id: ID!
    name: String!
  }
  type QuoteData {
    quotes: [Quote!]!
  }
  type AuthorData {
    authors: [Author!]!
  }
  input QuoteInputData {
    quote: String!
    authorId: String!
  }
  input AuthorInputData {
    name: String!
  }
  type RootQuery {
    quotes: QuoteData!
    authors: AuthorData!
  }
  type RootMutation {
    createQuote(quoteInput: QuoteInputData): Quote!
    updateQuote(id: ID!, quoteInput: QuoteInputData): Quote!
    deleteQuote(id: ID!): Quote!
    createAuthor(authorInput: AuthorInputData): Author!
    updateAuthor(id: ID!, authorInput: AuthorInputData): Author!
    deleteAuthor(id: ID!): Author!
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
