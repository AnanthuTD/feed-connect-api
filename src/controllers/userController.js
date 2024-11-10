import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator'
import prisma from '../prismaClient.js'
import { JWTService } from '../services/jwtServices.js'
import { RefreshTokenRepository } from '../repositories/RefreshTokenRepository.js'

const jwtService = new JWTService()
const refreshTokenRepo = new RefreshTokenRepository()

const handleRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken)
            return res.status(401).json({ error: 'No token provided' })

        // Verify refresh token
        try {
            const decoded = await refreshTokenRepo.getRefreshToken(refreshToken)

            const user = await prisma.user.findFirst({
                where: { id: decoded.id },
            })
            if (!user) return res.status(401).json({ error: 'User not found' })

            // Generate a new access token
            const newAccessToken = jwtService.generateAccessToken(user)

            // Generate new refresh token ( refresh token rotation )
            const newRefreshToken = jwtService.generateRefreshToken(user)
            await refreshTokenRepo.storeRefreshToken(user.id, newRefreshToken)

            // Set the new refresh token in the cookie
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })

            // Send new access token to the client
            res.json({ accessToken: newAccessToken })
        } catch (error) {
            res.status(401).json({
                message: error.message || 'Invalid refresh token',
            })
            console.log(error)
        }
    } catch (error) {
        console.error('Error fetching home page:', error)
        res.status(500).send('Error fetching home page')
    }
}

// Create new user - POST method
const createUser = async (req, res) => {
    console.log(req.body)
    // Validate input fields
    await body('phoneOrEmail')
        .notEmpty()
        .withMessage('Phone number or email is required')
        .custom((value) => {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            const isPhone = /^[0-9]{10,15}$/.test(value) // Adjust regex as per your phone format
            if (!isEmail && !isPhone) {
                throw new Error('Must be a valid phone number or email')
            }
            return true
        })
        .run(req)

    await body('fullName')
        .notEmpty()
        .withMessage('Full name is required')
        .run(req)

    await body('username')
        .notEmpty()
        .withMessage('Username is required')
        .run(req)

    await body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .run(req)

    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((error) => error.msg),
        })
    }

    const { fullName, username, phoneOrEmail, password } = req.body

    try {
        // Check if the email or phone number is already registered
        const userExists = await prisma.user.findFirst({
            where: {
                OR: [{ email: phoneOrEmail }, { phone: phoneOrEmail }],
            },
        })

        if (userExists) {
            return res.status(400).json({
                success: false,
                errors: ['Email or phone number is already registered'],
            })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phoneOrEmail)
                    ? phoneOrEmail
                    : null,
                phone: /^[0-9]{10,15}$/.test(phoneOrEmail)
                    ? phoneOrEmail
                    : null,
                password: hashedPassword,
            },
        })

        const accessToken = new JWTService().generateAccessToken({
            id: newUser.id,
        })
        const refreshToken = new JWTService().generateAccessToken({
            id: newUser.id,
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 3600000,
        })

        res.status(201).json({
            success: true,
            userId: newUser.id,
            username: newUser.username,
            accessToken,
        })
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({
            success: false,
            errors: ['An error occurred while creating the account'],
        })
    }
}

// Login user - POST method
const loginUser = async (req, res) => {
    // Validate input fields
    await body('phoneEmailUsername')
        .notEmpty()
        .withMessage('Phone number, username, or email is required')
        .run(req)

    await body('password')
        .notEmpty()
        .withMessage('Password is required')
        .run(req)

    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((error) => error.msg),
        })
    }

    const { phoneEmailUsername, password } = req.body

    try {
        // Find user by email, phone, or username
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: phoneEmailUsername },
                    { phone: phoneEmailUsername },
                    { username: phoneEmailUsername },
                ],
            },
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                errors: ['User not found with provided identifier'],
            })
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                errors: ['Invalid password'],
            })
        }

        // Generate tokens
        const accessToken = jwtService.generateAccessToken({ id: user.id })
        const refreshToken = jwtService.generateRefreshToken({ id: user.id })

        // Store refresh token in the database
        await refreshTokenRepo.storeRefreshToken(user.id, refreshToken)

        // Set refresh token as a cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        })

        // Respond with access token
        res.status(200).json({
            success: true,
            accessToken,
            userId: user.id,
            username: user.username,
        })
    } catch (error) {
        console.error('Error logging in user:', error)
        res.status(500).json({
            success: false,
            errors: ['An error occurred during login'],
        })
    }
}

const logoutUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    await refreshTokenRepo.deleteRefreshToken(refreshToken)

    res.clearCookie('refreshToken')
    res.json({ message: 'Logged out successfully' })
}

export { handleRefreshToken, createUser, loginUser, logoutUser }
