const { Thought, User, Reaction } = require('../models');

module.export = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .populate({ path: 'reactions', select: '-__v' })
                .select('-__v')
                // sort in DESC order by the _id value
                .sort({ _id: -1 });
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get thought by id
    async getThoughtById(req, res) {    
        try {
            const thought = await Thought.findOne({ _id: req.params.id })
                .populate({ path: 'reactions', select: '-__v' })
                .select('-__v');
            
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create thought
    async createThought(req, res) {
        try {
            // create the thought
            const thought = await Thought.create(req.body);
            // find the user associated with the thought just created and add the thought's _id to the user's thoughts array
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true, runValidators: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });

            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            // find the user associated with the thought and remove the thought's _id from the user's thoughts array
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            );

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add reaction to thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // add the reaction to the thought's reactions array
                { $addToSet: { reactions: req.body } },
                { new: true, runValidators: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete reaction from thought
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // remove the reaction from the thought's reactions array
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true, runValidators: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};