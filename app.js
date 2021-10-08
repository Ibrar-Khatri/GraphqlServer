const express = require('express')
const graphql = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const port = 4000

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.get('/users', (req, res) => {
    const query = "query {authors {name age id}}"
    graphql.graphql(schema, query)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err)
        })
})

app.get('/books', (req, res) => {
    const query = "query {books {id name genre }}"
    graphql.graphql(schema, query)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err)
        })
})

app.get('/book/:id', (req, res) => {
    console.log(req.params.id)
    const query = `query {book(id:${req.params.id}) {name}}`
    graphql.graphql(schema, query)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err)
        })
})
app.get('/authors', (req, res) => {
    const query = ' {authors {name id}}'
    graphql.graphql(schema, query)
        .then(resposne => {
            res.send(resposne)
        })
        .catch(err => {
            res.send(err)
        })
})

app.get('/author/:id', (req, res) => {
    const query = `{author(id:${req.params.id}){id name age }}`
    graphql.graphql(schema, query)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err)
        })
})

app.listen(port, (err) => {
    if (err) {
        console.log('Unable to start server')
    }
    console.log('Server started successfully')
})