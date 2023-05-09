const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thoughtId = req.params.id;
            const thought = await Thought.findOne({ _id: thoughtId });

            if (!thought) {
                return res.status(404).json({
                    message: `No thought found with id ${thoughtId}`,
                });
            }

            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const username = req.body.username;
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username },
                { $push: { thoughts: thought._id }},
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: `No user with username ${username}`,
                });
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thoughtId = req.params.id;
            const thought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                req.body,
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: `No thought found with id ${thoughtId}`,
                });
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtId = req.params.id;
            const thought = await Thought.findOneAndRemove({ _id: thoughtId });

            if (!thought) {
                return res.status(404).json({
                    message: `No thought found with id ${thoughtId}`,
                });
            }
            await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: thought._id } }
            );

            res.json({ 
                message: `Thought with id ${thoughtId} removed from database`,
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const thought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                {
                    $addToSet: {
                        reactions: req.body,
                    }
                },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: `No thought found with id ${thoughtId}`,
                });
            }

            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;
            const thought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                {
                    $pull: {
                        reactions: {
                            reactionId: reactionId,
                        },
                    },
                },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: `No thought found with id ${thoughtId}`,
                });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};