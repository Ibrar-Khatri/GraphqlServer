const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const port = 4000

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, (err) => {
    if (err) {
        console.log('Unable to start server')
    }
    console.log('Server started successfully')
})