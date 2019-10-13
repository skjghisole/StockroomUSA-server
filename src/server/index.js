import '@babel/polyfill'
import express from 'express'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'
import cors from 'cors'

import schema from '../schemas'

import isAuthenticated from '../middlewares/isAuthenticated'

const app = express()

app.use(cors())
app.use(isAuthenticated)

const {
	DB_USER_USERNAME,
	DB_USER_PASSWORD,
	DB_PROTOCOL,
	DB_PORT,
	DB_HOST,
	DB_NAME,
	NODE_ENV,
	PORT
} = process.env

const hostedEnvs = ['staging', 'production', 'ci']
let mongoURI;

console.log(`NODE_ENV -----------> ${NODE_ENV} <-----------`)

if (!hostedEnvs.some(env => env === NODE_ENV)) {
	mongoURI = `${DB_PROTOCOL}://${DB_HOST}:${DB_PORT}/${DB_NAME}`
} else {
	mongoURI = `${DB_PROTOCOL}://${DB_USER_USERNAME}:${DB_USER_PASSWORD}@cluster0-bnvga.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
	console.log('DB connected')
})

app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema
}))

const port = PORT || 4545

app.listen(port, () => console.log(`Started on http://localhost:${port}`))
