const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        // thoughtText is a string, it's required, and has a max length of 280 characters
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        // thought is timestamped when created
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        // username is a string and is required for a thought to be created
        username: {
            typ: String,
            required: true
        },
        reactions: [{reactionSchema}]
    },
    {
        toJSON: {
            // use virtuals and getters to format the data
            virtuals: true,
            getters: true
        },
        // use id instead of _id
        id: false
    }
);

// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;