const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get user by id
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                .select('-__v');
            
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create user
}