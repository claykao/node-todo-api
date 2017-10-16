require('./config/config');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = new express();

//default PORT is set in config.js
//const port = process.env.PORT || 3000;
const port = process.env.PORT;

app.use(bodyParser.json());

// -----------------------------------------------
// create a new todo doc
app.post('/todos', (req, res) => {
    console.log('Todo:', req.body);

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        console.log(`POST response: ${res}`);
        console.log(`POST Save doc: ${doc}`);
        console.log('\n');
        res.send(doc);
    }, (err) => {
        console.log(`Error: ${err}`);
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
        console.log('invalid ID');
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
        console.log('invalid ID');
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
    console.log('patch body', body);

    if (!ObjectID.isValid(id)) {
        console.log('invalid ID');
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
        console.log('error caught', err);
        res.status(400).send(err);
    });
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = {app};