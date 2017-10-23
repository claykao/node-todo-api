require('./config/config');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = new express();

//default PORT is set in config.js
//const port = process.env.PORT || 3000;
const port = process.env.PORT;

app.use(bodyParser.json());

// -----------------------------------------------
// create a new todo doc
app.post('/todos', (req, res) => {
    console.log('\tTodo:', req.body);

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        console.log(`\tPOST todo response: ${res}`);
        console.log(`\tPOST todo Save doc: ${doc}`);
        console.log('\n');
        res.send(doc);
    }, (err) => {
        console.log(`\tError: ${err}`);
        res.status(400).send(err);
    });
});

// -----------------------------------------------
// get all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

// -----------------------------------------------
// get a todo with the specified id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        console.log('\tget - invalid ID');
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// -----------------------------------------------
// delete a todo with the specified id
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        console.log('\tdelete - invalid ID');
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// -----------------------------------------------
// update a todo with the specified id
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    console.log('\tpatch body', body);

    if (!ObjectID.isValid(id)) {
        console.log('\tpatch - invalid ID');
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((err) => {
        console.log('\terror caught', err);
        res.status(400).send(err);
    });
});

// -----------------------------------------------
// create a new user
app.post('/users', (req, res) => {
    console.log('\tUser:', req.body);
    console.log('\n');

    var body = _.pick(req.body, ['email', 'password']);
    // var user = new User({
    //     email: body.email, 
    //     password: body.password
    // });   
    // can be simplified to var
    var user = new User(body);
    
    user.save().then(() => {
        console.log(`\tPOST user response: ${res}`);
        console.log(`\tPOST user Save doc: ${user}`);
        console.log('\n');
        //res.send(user);
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        console.log(`\tError: ${err}`);
        res.status(400).send(err);
    });
});

// express middleware
// var authenticate = (req, res, next) => {
//     var token = req.header('x-auth');

//     // model method
//     User.findByToken(token).then((user) => {
//         if (!user) {
//             return Promise.reject();
//         }

//         req.user = user;
//         req.token = token;
//         next();
//     }).catch((e) => {
//         res.status(401).send();
//     });
// };

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// -----------------------------------------------

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = {app};