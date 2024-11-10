import express from 'express'
import { createApolloServer } from './apolloServer.js'
import { setupMiddleware } from './middleware.js'
import router from './routes/index.js'

export async function startServer(port) {
    const app = express()

    // Apply middleware
    setupMiddleware(app)

    // Load routes
    app.use('/', router)

    // Start Apollo server
    const apolloServer = await createApolloServer()
    app.use('/graphql', express.json(), apolloServer)

    // Start the Express server
    return new Promise((resolve, reject) => {
        app.listen(port, (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}
