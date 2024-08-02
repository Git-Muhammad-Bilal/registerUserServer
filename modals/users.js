const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    
    password: {
        type: Number,
        required: true
        
    },

    role: {
      type: Schema.Types.ObjectId,
      ref: 'Roles',
      required: false
  },

})

module.exports = mongoose.model('Users', UserSchema)
/* /** 
* Paste one or more documents here
*/
/* {
    "_id": {
      "$oid": "6696499ddd73cb1f5de29401"                                                     
      }
    "name":"peter",
    "email":"peter@g.com",
    "password":123;
    "role":"superAdmin",

    "subUsers":[
      {
         "id": "123"
      }
      {
         "id": "123"
       }
      {
         "id": "123"
       }
    ]
}
  
  
  
  
  
  
  
  features:[
    {
      "roleid":"22"
      "featureName":"A"
      "list":"true"
      "read":"true"
      "edit":"false"
      "delete":"true"
      
    },{ 
      "roleid":"22"
      "featureName":"b"
      "list":"true"
      "read":"false"
      "edit":"true"
      "delete":"false"
    }
    {
      "roleid":"33"
      "featureName":"d"
      "list":"true"
      "read":"true"
      "edit":"true"
      "delete":"true"
      
    },{ 
      "roleid":"33"
      "featureName":"h"
      "list":"true"
      "read":"false"
      "edit":"true"
      "delete":"false"
    }
  ] */













