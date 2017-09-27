//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  // see below

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // find one and update - Todos
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('598e7ead3026fdfd806fdc94')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }, (err) => {
        console.log(err);
    });

    // find one and update - Users
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('598d293c12fca30c20e73399')
    }, {
        $set: {
            name: 'Cody Ross'
        },
        $inc: {
            age: 2
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }, (err) => {
        console.log(err);
    });

    db.close();
});