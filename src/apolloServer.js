import { ApolloServer } from '@apollo/server'
import { createContext } from './graphql/context.js'
import { schema } from './graphql/schema.js'
import { expressMiddleware } from '@apollo/server/express4'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'

export async function createApolloServer(httpServer) {
    // Create the Apollo server
    const apolloServer = new ApolloServer({
        schema,
    })

    await apolloServer.start()

    // Set up WebSocket server for GraphQL subscriptions
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    })

    const serverCleanup = useServer(
        {
            schema,
            context: createContext,
        },
        wsServer
    )

    // Handle graceful shutdown for WebSocket and Apollo Server
    httpServer.on('close', async () => {
        console.log('Cleaning up WebSocket and Apollo resources...')
        await serverCleanup.dispose()
        await apolloServer.stop()
    })

    // Return middleware for Express
    return expressMiddleware(apolloServer, {
        context: createContext,
    })
}
