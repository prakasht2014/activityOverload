/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    schema: true,

    attributes: {

        name: {
            type: 'string',
            required: true
        },

        title: {
            type: 'string'
        },

        email: {
            type: 'email',
            required: true,
            unique: true
        },

        encryptedPassword: {
            type: 'string'
        }
    },

    'beforeCreate': function (values, next) {
            
        // This checks to make sure the password and confirmation match before creating record
        if (!values.password || values.password != values.confirmation) {
            return next({ err: ["Passwrod doesn't match password confirmation"] });
        }

        require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPasswrod) {
            if (err) return next(err);

            values.encryptedPassword = encryptedPasswrod;
            return next();
        });
    }
};
