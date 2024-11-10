import prisma from '../prismaClient.js'
import { JWTService } from '../services/jwtServices.js'

export class RefreshTokenRepository {
    async storeRefreshToken(userId, refreshToken) {
        const jwtService = new JWTService()
        const decoded = jwtService.verifyRefreshToken(refreshToken)

        if (!decoded || !decoded.exp) {
            throw new Error('Invalid refresh token')
        }

        // Convert `exp` (which is in seconds) to a JavaScript Date object
        const expiresAt = new Date(decoded.exp * 1000)

        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId,
                expiresAt,
            },
        })
    }

    deleteRefreshToken(refreshToken) {
        return prisma.refreshToken.delete({ where: { token: refreshToken } })
    }

    async getRefreshToken(token) {
        try {
            const refreshToken = await prisma.refreshToken.findFirst({
                where: { token },
            })

            if (!refreshToken) {
                throw new Error('Refresh token not found')
            }

            const decoded = new JWTService().verifyRefreshToken(
                refreshToken.token
            )

            if (!decoded || decoded.exp < Date.now() / 1000) {
                await prisma.refreshToken.delete({
                    where: { token },
                })
                throw new Error('Refresh token expired')
            }

            return decoded
        } catch (error) {
            console.error('Error verifying refresh token:', error.message)
            throw error
        }
    }
}
