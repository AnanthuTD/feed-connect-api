import { JWTService } from '../services/jwtServices'

const authenticate = (req, res, next) => {
    // Extract token from the authorization header
    const token =
        req.headers.authorization && req.headers.authorization.split(' ')[1]

    // If no token is found, send an error response
    if (!token) {
        return res.status(401).json({
            message:
                'Authentication failed! Please log in or go to the home page.',
        })
    }

    try {
        // Verify token with secret key
        const decodedToken = new JWTService().verifyAccessToken(token)
        req.userData = {
            userId: decodedToken.id,
        }
        next() // Proceed if token is valid
    } catch (error) {
        // If verification fails, send an error response
        console.log('Authentication failed! ', error)
        return res.status(401).json({
            message:
                'Authentication failed! Please log in or go to the home page.',
        })
    }
}

export default authenticate
