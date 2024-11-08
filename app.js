import express, { urlencoded, static as expressStatic, json } from 'express'
import router from './routes/index.js'
import cookieParser from 'cookie-parser'
import { ApolloServer } from '@apollo/server'
import { context } from './graphql/context.js'
import { schema } from './graphql/schema.js'
import { expressMiddleware } from '@apollo/server/express4'

const app = express()
const PORT = process.env.PORT || 3000

app.use(urlencoded({ extended: true }))
app.use(expressStatic('public'))
app.use(cookieParser())
app.use(json())

const apolloServer = new ApolloServer({
    schema,
    context,
})

await apolloServer.start()

app.use('/', router)

app.use('/graphql', express.json(), expressMiddleware(apolloServer))

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`)
})
