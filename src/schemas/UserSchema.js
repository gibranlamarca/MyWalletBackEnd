const joi = require('joi');

const signIn = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

const signUp = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmationPassword: joi.string().valid(joi.ref('password')).required(),
    username: joi.string().alphanum().min(6).required()
});

module.exports = { signIn , signUp }
