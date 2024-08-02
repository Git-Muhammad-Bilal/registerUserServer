
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const RolesSchema = new Schema({
    roleName: {
        type: String,
        required: true

    },

    features: [{
        type: Schema.Types.ObjectId,
        ref: 'RoleSpecficFeature',
    }],


})

module.exports = mongoose.model('Roles', RolesSchema)

















