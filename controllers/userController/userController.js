const getHome = async () => {}
const showCreateUserForm = async (req, res) => {
    res.render('createUser')
}
const createUser = async (req, res) => {
    try {
        // const { name, email } = req.body
        // const newUser = new User({ name, email })
        // await newUser.save()
        res.redirect('/users')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getHome,
    showCreateUserForm,
    createUser,
}
