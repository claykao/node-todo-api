const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// remove all with empty object, does not return removed doc
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove
// both return removed doc

Todo.findOneAndRemove('some_id').then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('some_id').then((todo) => {
    console.log(todo);
});