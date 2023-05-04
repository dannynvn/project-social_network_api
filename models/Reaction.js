const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        // set custom id; prevents confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Types.ObjectId()
        },
        // reactionBody is a string, it's required, and has a max length of 280 characters
        reactionBody: {
            type: String,
            required: true,
            minLenth: 1,
            maxLength: 280
        },
        // username is a string and is required
        username: {
            type: String,
            required: true
        },
        // reaction is timestamped when created
        createdAt: {
            type: Date,
            default: new date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        // use toJSON to tell schema to use getters
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = ReactionSchema;