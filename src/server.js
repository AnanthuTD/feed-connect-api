import express from 'express'
import { createApolloServer } from './apolloServer.js'
import { setupMiddleware } from './middleware.js'
import router from './routes/index.js'
import { createServer } from 'http'
import morgan from 'morgan'

export async function startServer(port) {
    const app = express()

    // Apply Morgan for HTTP request logging
    app.use(morgan('dev')) // You can use 'combined', 'dev', or a custom format

    // Apply additional middleware
    setupMiddleware(app)

    // Load routes
    app.use('/', router)

    // Create the HTTP server
    const httpServer = createServer(app)

    // Initialize Apollo server and middleware
    const apolloMiddleware = await createApolloServer(httpServer)
    app.use('/graphql', express.json(), apolloMiddleware)

    // Start the HTTP server
    httpServer.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/graphql`)
    })

    // Handle graceful shutdown
    process.on('SIGTERM', async () => {
        console.log('Shutting down server...')
        httpServer.close(() => {
            console.log('Server closed.')
        })
    })
}
