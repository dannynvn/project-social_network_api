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
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update user by id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete user and associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });

            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            await Thought.deleteMany({ username: user.username });
            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add friend to user's friend list
    async addFriend(req, res) {
        console.log('adding friend');
        console.log(req.body);

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete friend from user's friend list
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};