import { JWTService } from '../services/jwtServices.js'

class AuthMiddleware {
    constructor(jwtService = new JWTService()) {
        this.jwtService = jwtService
    }

    authenticate = (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return this._handleUnauthorized(res, 'No token provided.')
        }

        try {
            const decodedToken = this.jwtService.verifyAccessToken(token)
            req.user = { id: decodedToken.id }
            if (next) {
                // For REST API, continue to the next middleware
                return next()
            } else {
                // For GraphQL, return user context
                return req.user
            }
        } catch (error) {
            console.error('Authentication failed!', error)
            return this._handleUnauthorized(res, 'Invalid or expired token.')
        }
    }

    verifyToken = (token) => {
        if (!token) {
            return this._handleUnauthorized(null, 'No token provided.')
        }

        try {
            const decodedToken = this.jwtService.verifyAccessToken(token)
            return { id: decodedToken.id }
        } catch (error) {
            console.error('Authentication failed!', error)
            return this._handleUnauthorized(null, 'Invalid or expired token.')
        }
    }

    _handleUnauthorized = (res, message) => {
        if (res) {
            // REST API response
            return res.status(401).json({
                message: `Authentication failed: ${message}`,
            })
        } else {
            return null
        }
    }
}

export default AuthMiddleware
