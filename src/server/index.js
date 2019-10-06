import express from 'express'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'

import schema from '../schemas'

const app = express()

const {
	DB_USER_USERNAME,
	DB_USER_PASSWORD,
	DB_PROTOCOL,
	DB_PORT,
	DB_HOST,
	NODE_ENV
} = process.env

const hostedEnvs = ['staging', 'production', 'ci']
let mongoURI;

console.log(`Env is ${NODE_ENV}`)

if (!hostedEnvs.some(env => env === NODE_ENV)) {
	mongoURI = `mongodb://${DB_HOST}:${DB_PORT}/`
} else {
	mongoURI =	`${DB_PROTOCOL}://${DB_USER_USERNAME}:${DB_USER_PASSWORD}@cluster0-bnvga.mongodb.net/admin?retryWrites=true&w=majority`
}

mongoose.connect(mongoURI)
mongoose.connection.once('open', () => {
	console.log('DB connected')
})


app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema
}))
const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Started on http://localhost:${port}`))