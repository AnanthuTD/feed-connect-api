import { ApolloServer } from '@apollo/server'
import { createContext } from './graphql/context.js'
import { schema } from './graphql/schema.js'
import { expressMiddleware } from '@apollo/server/express4'

export async function createApolloServer() {
    const apolloServer = new ApolloServer({
        schema,
    })

    await apolloServer.start()

    return expressMiddleware(apolloServer, { context: createContext })
}
