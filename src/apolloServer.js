import { ApolloServer } from '@apollo/server'
import { createContext } from './graphql/context.js'
import { schema } from './graphql/schema.js'
import { expressMiddleware } from '@apollo/server/express4'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

export async function createApolloServer(httpServer) {
    // Set up WebSocket server for GraphQL subscriptions
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    })

    const serverCleanup = useServer(
        {
            schema,
            context: (ctx) => {
                // console.log("WebSocket context", ctx, msg, args);
                return createContext(ctx)
            },
            onError: (ctx, msg, errors) => {
                console.error('Subscription error:', errors)
            },
            onDisconnect(ctx, code, reason) {
                console.log('Disconnected!', code, reason)
            },
            onConnect() {
                console.log('Connected!')
            },
        },
        wsServer
    )

    // Create the Apollo server
    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        },
                    }
                },
            },
        ],
    })

    await apolloServer.start()

    // Return middleware for Express
    return expressMiddleware(apolloServer, {
        context: createContext,
    })
}
