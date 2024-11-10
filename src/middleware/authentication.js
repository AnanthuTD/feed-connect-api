import { JWTService } from '../services/jwtServices.js'

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            message:
                'Authentication failed! Please log in or go to the home page.',
        })
    }

    try {
        const decodedToken = new JWTService().verifyAccessToken(token)
        req.user = { id: decodedToken.id }
        next()
    } catch (error) {
        console.log('Authentication failed! ', error)
        return res.status(401).json({
            message:
                'Authentication failed! Please log in or go to the home page.',
        })
    }
}
