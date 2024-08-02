const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const SuperAdminSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    usersIds: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        }
    }],
    RoleIds: [{
        RoleId: {
            type: Schema.Types.ObjectId,
            ref: 'Roles',
            required: true
        }
    }]

})

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema)


// { productId:{  type: Schema.Types.ObjectId,
//   ref:'Products',
//   required: true
// }















