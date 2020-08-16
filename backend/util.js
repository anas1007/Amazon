var jwt = require('jsonwebtoken');
var config = require('./config');
// import jwt from 'jsonwebtoken';
// import config from './config';

// const getToken = (user) => {
//     return jwt.sign({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//     }, config.JWT_SECRET, {
//         expiresIn: '48h'
//     })
// }

module.exports.getToken = function (user) {
    console.log(jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    }));
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

module.exports.isAuth = function (req, res, next) {
    console.log("isAuth");
    const token = req.headers.authorization;
    console.log(token);
    if (token) {
        const onlyToken = token.slice(6, token.length);
        console.log(onlyToken);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if (err) {
                console.log(err);
                return res.status(401).send({ msg: 'Invalid Token' });
            }
            req.user = decode;
            console.log(decode);
            next();
            return
        });
    } else {
        return res.status(401).send({ msg: "Token is not supplied." });
    }
    
}

module.exports.isAdmin = function (req, res, next) {
    console.log("isAdmin");
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg: 'Admin Token is not valid.' });
}

// export {
//     getToken, isAuth, isAdmin
// }