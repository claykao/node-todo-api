const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '59d043c5fcf3633290e7d4aa';

if (!ObjectID.isValid(id)) {
    console.log('ID is not valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos:', todos);
}).catch((err) => console.log('Todo.find error:', err));

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo:', todo);
}).catch((err) => console.log('Todo.findOne error:', err));

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('ID not found');
    }
    console.log('Todo by ID:', todo);
}).catch((err) => console.log('Todo.findById error:', err));

/////////////////////////////////////////////////////////////

var userid = '59d0788f8f9cb131a24ba6e8';

User.findById(userid).then((user) => {
    if (!user) {
        return console.log('User ID not found');
    }
    console.log('User by ID:', user);
}).catch((err) => console.log('User.findById error:', err));
