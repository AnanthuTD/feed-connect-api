import { UserRepository } from '../repositories/UserRepository.js'

export class ProfileController {
    userRepository = new UserRepository()

    getProfile = async (req, res) => {
        const userId = req.user.id

        if (!userId) {
            return res
                .status(401)
                .json({ message: 'No authenticated user found!' })
        }

        const user = await this.userRepository.findById(userId)

        if (!user) {
            return res
                .status(401)
                .json({ message: 'No authenticated user found' })
        }

        const userResponseData = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            phone: user.phone,
            avatar: user.avatar,
        }

        res.json({ user: userResponseData })
    }
}
