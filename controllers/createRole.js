const Features = require('../modals/Features');
const RoleSpecficFeature = require('../modals/RoleSpecificFeature');
const PermissionModel = require('../modals/Permisssions');
const Roles = require('../modals/Roles');
const roleSpecificFeature = require('../modals/RoleSpecificFeature');
const RoleSpecificFeature = require('../modals/RoleSpecificFeature');




exports.createRole = async (req, res) => {
    const { role, permissions } = req.body


    const rolePayload = []
    try {

        let roleExist = await Roles.findOne({ roleName: role })


        if (roleExist) {
            res.send({ error: 'user already exists' })
            return;
        }
        const createdRole = new Roles({ roleName: role });

        Object.entries(permissions)?.forEach(async ([feature, permissions]) => {
            const featureFound = await Features?.findOne({ fId: feature });
            const foundPermissionss = await PermissionModel?.find({ pId: { $in: permissions } }).select('_id');
            const roleFeature = await RoleSpecficFeature.create({ roleId: createdRole._id, featureId: featureFound?._id, permissions: foundPermissionss })
            rolePayload.push(roleFeature);
        })
        createdRole.features = rolePayload;
        await createdRole.save();



    } catch (error) {
        console.log(error.message);
    }
}
exports.editRole = async (req, res) => {
    const { role, permissions, roleId } = req.body

    try {

        await Roles.updateOne({ roleName: role }, { $set: { roleName: role } })

        Object.entries(permissions)?.forEach(async ([feature, permissions]) => {

            const featureFound = await Features?.findOne({ fId: feature });
            const foundPermissionss = await PermissionModel?.find({ pId: { $in: permissions } }).select('_id');
            const foundRoleSpecificFeature = await RoleSpecficFeature.findOne({ roleId: roleId, featureId: featureFound?._id }).select('permissions')

            let permissionssMapedIdsString = foundPermissionss?.map((p) => p?._id.toString())
            let permissionssMapedIds = foundPermissionss?.map((p) => p?._id)

            let updatedPermissions = foundRoleSpecificFeature?.permissions?.filter((p, ind) => {
                
                let indexRolPerm = permissionssMapedIdsString.indexOf(p._id?.toString())
                indexRolPerm >= 0 && permissionssMapedIds.splice(indexRolPerm, 1)
                if (!permissionssMapedIdsString.includes(p._id?.toString())) {
                    return p?._id
                }

                
            })


            updatedPermissions = !foundRoleSpecificFeature?.permissions?.length ? permissionssMapedIds : [...updatedPermissions, ...permissionssMapedIds]
            
            const roleFeature = await RoleSpecficFeature.updateOne({ roleId: roleId, featureId: featureFound?._id, }, { $set: { permissions:updatedPermissions } }, { upsert: true })
        })



    } catch (error) {
        console.log(error.message);
    }
}


exports.getRoles = async (req, res) => {

    try {
        let roles = await Roles.find()
        res.send(roles)

    } catch (error) {
        console.log(error.message);
    }
}

exports.getRoleInfo = async (req, res) => {
    try {
        let rolesData = await Roles.findOne({ _id: req.params.roleId })
        let RoleSpecfiedFeatures = await RoleSpecficFeature.find({ roleId: req.params.roleId }).select(['-_id', 'featureId', 'permissions'])

        res.send({ RoleSpecfiedFeatures: [...RoleSpecfiedFeatures], roleName: rolesData?.roleName })
    } catch (error) {
        console.log(error.message)
    }
}

