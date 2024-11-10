import prisma from '../prismaClient.js'

export class UserRepository {
    async findById(id) {
        try {
            return await prisma.user.findFirst({ where: { id } })
        } catch (error) {
            console.error('Error finding user: ', error)
            return null
        }
    }
}
