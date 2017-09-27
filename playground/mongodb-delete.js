//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  // see below

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // delete many - Todos
    // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // delete one - Todos
    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // find one and delete - Todos
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // delete many - Users
    // db.collection('Users').deleteMany({name: 'John Doe'}).then((result) => {
    //     console.log(result);
    // });

    // find one and delete - Users
    db.collection('Users').findOneAndDelete({_id: new ObjectID('598d2a657ab8150e8cfe9443') }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }, (err) => {
        console.log(err);
    });

    db.close();
});