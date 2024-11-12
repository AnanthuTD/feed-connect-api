import { JWTService } from '../services/jwtServices.js'

class AuthMiddleware {
    constructor(jwtService = new JWTService()) {
        this.jwtService = jwtService
    }

    authenticate(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return this._handleUnauthorized(req, res, 'No token provided.')
        }

        try {
            const decodedToken = this.jwtService.verifyAccessToken(token)
            req.user = { id: decodedToken.id }
            if (next) {
                // For REST API, continue to the next middleware
                return next()
            } else {
                // For GraphQL, return user context
                return { user: req.user }
            }
        } catch (error) {
            console.error('Authentication failed!', error)
            return this._handleUnauthorized(
                req,
                res,
                'Invalid or expired token.'
            )
        }
    }

    _handleUnauthorized(req, res, message) {
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
