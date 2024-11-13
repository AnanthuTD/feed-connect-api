import { GraphQLError } from 'graphql'

export function ensureAuthenticated(context) {
    if (!context) {
        console.log('Expected context as parameter!')
        throw new GraphQLError('Did you forget to pass context', {
            extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
            },
        })
    }

    if (!context.user) {
        throw new GraphQLError('User is not authenticated', {
            extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
            },
        })
    }
}
