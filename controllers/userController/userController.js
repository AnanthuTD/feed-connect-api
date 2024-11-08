import prisma from '../../prismaClient'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator'

// Secret key for JWT, use environment variable in production
const JWT_SECRET = 'secretkeyappearshere'

// Render the home page - GET method
const getHome = async (req, res) => {
    try {
        // Check for the token in cookies
        const token = req.cookies.token

        if (token) {
            // Verify the token
            const decoded = jwt.verify(token, JWT_SECRET)

            // Find the user in the database using the userId from token
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
            })

            if (user) {
                // Render home page for logged-in user
                res.render('home', { user })
                return
            }
        }

        // Render home page for guest (not logged in)
        res.render('home', { user: null })
    } catch (error) {
        console.error('Error fetching home page:', error)
        res.status(500).send('Error fetching home page')
    }
}

// Render signup form - GET method
const showCreateUserForm = async (req, res) => {
    res.render('createUser')
}

// Create new user - POST method
const createUser = async (req, res) => {
    // Validate input fields
    await body('name').notEmpty().withMessage('Name is required').run(req)
    await body('username')
        .notEmpty()
        .withMessage('Username is required')
        .run(req)
    await body('email').isEmail().withMessage('Invalid email format').run(req)
    await body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .run(req)
    await body('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match')
        .run(req)

    // Check for validation errors
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((error) => error.msg),
        })
    }

    const { name, username, email, password } = req.body

    try {
        const userExists = await prisma.user.findUnique({
            where: { email },
        })

        if (userExists) {
            return res.status(400).json({
                success: false,
                errors: ['Email is already registered'],
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
            },
        })

        const token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(201).json({
            success: true,
            data: {
                userId: newUser.id,
                email: newUser.email,
                token: token,
            },
        })
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({
            success: false,
            errors: ['An error occurred while creating the account'],
        })
    }
}

// Render login page - GET method
const showLoginForm = async (req, res) => {
    res.render('login')
}

// Login user - POST method
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                errors: ['Invalid email or password'],
            })
        }

        // Compare the hashed password with the password from the request
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                errors: ['Invalid email or password'],
            })
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 })

        res.redirect('/')
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({
            success: false,
            errors: ['An error occurred during login'],
        })
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('token') // Clear the token cookie
    res.redirect('/') // Redirect to home page
}

module.exports = {
    getHome,
    showCreateUserForm,
    createUser,
    showLoginForm,
    loginUser,
    logoutUser,
}
