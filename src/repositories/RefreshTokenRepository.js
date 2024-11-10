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
}
