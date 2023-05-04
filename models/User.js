const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        // username is a string, is required, and must be unique between the collection
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        // email is a string, is required, must match a valid email address, and must be unique between the collection
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/]
        },
        // thoughts are associated with the user's _id, and they're an array of _id values referencing the Thought model
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        // friends are associated with the user's _id, and they're an array of _id values referencing the User model    
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        // use toJSON to tell schema to use virtuals
        toJSON: {
            virtuals: true,
        },
        // use id instead of _id
        id: false
    }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;