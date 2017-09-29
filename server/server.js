var express = require('express');
var bodyParser = require('body-parser');

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
        console.log(`response: ${res}`);
        res.send(doc);
    }, (err) => {
        console.log(`Error: ${err}`);
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});