const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// first parameter of genSalt is # of runs
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('password hash', hash);
    });
});

var hashedPassword = '$2a$10$I22zof18d9iojoUXh5atiu.8pZFqjiILjlkpdCVopsZz29qnzWA5y';

bcrypt.compare(password, hashedPassword, (err, result) => {
    console.log('Password compare', result);
});

var data1 = {
    id: 10
};

// 123abc is the secret
var token = jwt.sign(data1, '123abc');
console.log('encoded', token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);

var message = 'I am user number 8';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data changed, do not trust');
}
