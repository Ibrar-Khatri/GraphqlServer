const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql


var books = [
    { name: 'Book 01', genre: 'genre 01', id: '1' },
    { name: 'Book 02', genre: 'genre 01', id: '2' },
    { name: 'Book 03', genre: 'genre 01', id: '3' },
]
var authors = [
    { name: 'User 01', age: 20, id: '1' },
    { name: 'User 02', age: 30, id: '2' },
    { name: 'User 03', age: 45, id: '3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                //lodash aik library hai jo array wagera mainsy data filter kerny k leye hota hai or is main or bhi methods hain
                return _.find(books, { id: args.id })
                // return books.filter(book => book.id == args.id)
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
})


module.exports = new GraphQLSchema({
    name: 'Query',
    // description:'', is main hum kuch bhi likh sakty hain
    query: RootQuery
})