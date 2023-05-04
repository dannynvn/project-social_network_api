// Connect to the database
const { connect, connection } = require('mongoose');

// Connect to the Mongo DB
const connectionString = process.env.MONGODB_URI || "mongodb://localhost/social-network-api";

connect[connectionString];

module.exports = connection;