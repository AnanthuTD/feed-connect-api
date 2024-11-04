import prisma from '../../prismaClient'
import jwt from 'jsonwebtoken'
const getHome = async () => {}
const showCreateUserForm = async (req, res) => {
    res.render('createUser')
}
const createUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        // Creating the new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        })

        // Generating a JWT token
        const token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email,
            },
            'secretkeyappearshere',
            { expiresIn: '1h' }
        )

        // Redirect or respond with JSON, depending on your intended flow
        // Uncomment one of the options below

        // Option 1: Redirect to a different page after creating the user
        // res.redirect('/users');

        // Option 2: Send JSON response with the token and user data
        res.status(201).json({
            success: true,
            data: {
                userId: newUser.id,
                email: newUser.email,
                token: token,
            },
        })
    } catch (error) {
        console.error('Error! Something went wrong.', error)
        res.status(500).send('Error! Something went wrong.')
    }
}

module.exports = {
    getHome,
    showCreateUserForm,
    createUser,
}
