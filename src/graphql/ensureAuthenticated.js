import { GraphQLError } from 'graphql'

export function ensureAuthenticated(context) {
    if (!context.user) {
        throw new GraphQLError('User is not authenticated', {
            extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
            },
        })
    }
}
