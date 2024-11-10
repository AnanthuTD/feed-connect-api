import jwt from 'jsonwebtoken'

export class JWTService {
    // Generate access token (short-lived)
    generateAccessToken = (user) => {
        return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m',
        })
    }

    // Generate refresh token (long-lived)
    generateRefreshToken = (user) => {
        return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d',
        })
    }

    // Verify access token
    verifyAccessToken = (token) => {
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        } catch (error) {
            console.error('Access token verification failed:', error.message)
            return null // Token is invalid or expired
        }
    }

    // Verify refresh token
    verifyRefreshToken = (token) => {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        } catch (error) {
            console.error('Refresh token verification failed:', error.message)
            return null // Token is invalid or expired
        }
    }
}
