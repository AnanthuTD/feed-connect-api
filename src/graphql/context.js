import prisma from '../prismaClient.js'

export const createContext = ({ req }) => ({
    prisma,
    user: req.user,
})
