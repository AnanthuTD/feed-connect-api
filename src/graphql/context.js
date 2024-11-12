import AuthMiddleware from '../middleware/authentication.js'
import prisma from '../prismaClient.js'

const authMiddleware = new AuthMiddleware()

export const createContext = ({ req }) => ({
    prisma,
    user: authMiddleware.authenticate(req),
})
