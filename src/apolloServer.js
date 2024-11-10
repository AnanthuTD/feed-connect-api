import { ApolloServer } from '@apollo/server'
import { context } from './graphql/context.js'
import { schema } from './graphql/schema.js'
import { expressMiddleware } from '@apollo/server/express4'

export async function createApolloServer() {
    const apolloServer = new ApolloServer({
        schema,
        context,
    })

    await apolloServer.start()

    return expressMiddleware(apolloServer)
}
