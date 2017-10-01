var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = new express();

app.use(bodyParser.json());

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

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

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

module.exports = {app};