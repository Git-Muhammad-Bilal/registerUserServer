const mongoose = require('mongoose');
const PermissionModel = require("./modals/Permisssions")
const Features = require('./modals/Features')
const Roles = require('./modals/Roles')
const Users = require("./modals/users");
const RoleSpecificFeature = require('./modals/RoleSpecificFeature'); 
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URI).then(async (connection) => {
       console.log('connecitoons');
    // try {
    //     let data = await PermissionModel.find()
    //     console.log(!data.length, 'length');
    //     data?.length && PermissionModel?.collection?.drop()
    // } catch (error) {

    // }
    // try {
    //     let data = await Features.find()

    //     console.log(!data.length, 'length');
    //     data.length && Features.collection?.drop()
    // } catch (error) {
        
    // }
    // seedData(connection)

}).catch(err => {
    console.log(err.message);
})

async function seedData() {

    try {
        // await dropCollections();

        const _permissions = ['add', 'list', 'read', 'edit', 'delete']?.map(async (p) => await PermissionModel.create({ name: p }));
        const permissions = await Promise.all(_permissions);
        const _featueres = ['Roles','Users', 'Todos', 'Notes'].map(async (f) => await Features.create({ featureName: f, permissions: permissions?.map(p => p._id) }))
        const allFeatures = await Promise.all(_featueres);
        const exsistingUser = await Users.findOne({ name: 'peter', email: 'peter@gmail.com' })
        const roles = await Roles.findOne({ roleName: 'superAdmin' })
        const superAdminRole = await Roles?.create({ roleName: 'superAdmin', features: [] });

        const roleFeatures = allFeatures?.map(async f =>
            await RoleSpecificFeature.create(
                {
                    roleId: superAdminRole?._id,
                    featureId: f?._id,
                    permissions: permissions?.map(p => p?._id)
                }
            ))

        exsistingUser || await Users.create({
            name: 'peter',
            email: 'peter@gmail.com',
            role: superAdminRole?._id,
            password: 123
        })

        superAdminRole.features = roleFeatures;
        superAdminRole?.save()

    } catch (error) {
        console.log(error.message)
    }

}









