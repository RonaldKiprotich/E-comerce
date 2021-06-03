/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    email: {
      type: 'string',
      required: true,
      isEmail: true,
      unique: true
    },
    first_name: {     
     type: 'string',
    },
    last_name: {     
     type: 'string',
    },
    password: {     
     type: 'string',
     required: true,
    },
    date_of_birth: {     
      type: 'string',
      required: true,
     },
     profile_picture: {     
      type: 'string',
      
     },
     gender: {     
      type: 'string',
      required: true,
     },
     active: {     
    type: 'boolean',
      required: true,
     },
    

  },

};

