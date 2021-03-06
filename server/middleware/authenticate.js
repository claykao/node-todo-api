var {User} = require('./../models/user');

// authenticate middleware
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    // model method
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};
