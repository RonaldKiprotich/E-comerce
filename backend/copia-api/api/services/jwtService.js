const jwt = require('jsonwebtoken')
const SECRET = 'mySecretKey'

module.exports = {
    issuer(payload, expiresIn){
        return jwt.sign(payload, SECRET, {
            expiresIn
        })
    },
    verify(token){
        console.log(token);
        return jwt.verify(token, SECRET);
    }
}