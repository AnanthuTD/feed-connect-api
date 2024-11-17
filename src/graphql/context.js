import AuthMiddleware from '../middleware/authentication.js'
import prisma from '../prismaClient.js'

const authMiddleware = new AuthMiddleware()

export const createContext = ({ req, connectionParams }) => {
    let user = null

    if (connectionParams) {
        // WebSocket-specific context
        user = connectionParams.authToken
            ? authMiddleware.verifyToken(connectionParams.authToken)
            : null
    } else if (req) {
        user = authMiddleware.authenticate(req)
    }

    return { prisma, user }
}
