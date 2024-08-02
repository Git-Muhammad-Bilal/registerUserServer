
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const RoleSpecficFeatureSchema = new Schema({
    roleId: {
        type: Schema.Types.ObjectId ,
        ref: 'Roles',
        // required: true
    },
    featureId:{
        type: Schema.Types.ObjectId ,
        ref: 'Features',
        // required: true
    }, 
    permissions: [{
        type: Schema.Types.ObjectId ,
        ref: 'Permissions',
    }],
     
    
})

module.exports = mongoose.model('RoleSpecficFeature', RoleSpecficFeatureSchema)


