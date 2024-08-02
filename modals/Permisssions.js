const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const PermissionsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pId: {
        type: Number
    }
})

let PermissionModel;
PermissionsSchema.pre('save', function (next) {
    let permissions = ['add', 'list', 'read', 'edit', 'delete'];
    let ind = permissions.indexOf(this.name)
    this.pId = ind + 1
    next()

})



PermissionModel = mongoose.model('Permission', PermissionsSchema);
module.exports = PermissionModel;
















