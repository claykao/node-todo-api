var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//default MONGODB_URI is set in config.js
//mongoose.connect('mongodb://localhost:27017/TodoApp2');
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp2');
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};