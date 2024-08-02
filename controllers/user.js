const Features = require('../modals/Features');
const PermissionModel = require('../modals/Permisssions');
const RoleSpecificFeature = require('../modals/RoleSpecificFeature');
let Users = require('../modals/users');
let Roles = require('../modals/Roles')





exports.getLogedInUser = async (req, res) => {
    const { email, password } = req.body

    try {
        let data = await Users.findOne({ email: email });
        let foundRole = await Roles.findOne({ _id: data?.role });
        res.send({ user: data, role: foundRole?.roleName });

    } catch (error) {
        res.status(404).send(error.message)
    }
}



exports.getUserSignUpInfo = async (req, res) => {
    const { subUserId } = req?.params

    try {
        let data = await Users.findOne({ _id: subUserId })
        res.send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
}
exports.getUsersList = async (req, res) => {

    try {
        let data = await Users.find()
        res.send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

async function handleSpecificFeatueOrPermissions(modal, roleId, featureId = null) {
    try {


        let { _id } = await PermissionModel.findOne({ name: 'list' })

        let roleSpecficFeature = await RoleSpecificFeature.find({
            roleId: roleId, $and: [
                { 'permissions': { $exists: true, $not: { $size: 0 } } },
                { 'permissions': _id }
            ]
        })

        let slectedFeatturesAndPermission = await roleSpecficFeature.map(async (rolSpFet) => {
            let foundPermisions = await PermissionModel.find({ _id: { $in: rolSpFet?.permissions } })

            //    let feature =  await Features.findByIdAndUpdate({ _id: rolSpFet?.featureId },{$set:{permisions:[rolSpFet?.permissions]}})
            let feature = await Features.findById({ _id: rolSpFet?.featureId })
          
            return {_id:feature._id, featureName:feature.featureName, fId:feature.fId, permissions:[...foundPermisions]}

        })

        return await Promise.all(slectedFeatturesAndPermission)

    } catch (error) {
        console.log(error, 'message');
    }


}

exports.getUser = async (req, res) => {
    const { userId, featureId } = req?.params
    try {
        let data = await Users.findOne({ _id: userId })
        if (userId && !featureId) {
            let result = await handleSpecificFeatueOrPermissions(Features, data.role)
            res.status(200).send(result)
            return;

        }
        if (featureId) {
            let roleSpecficFeature = await RoleSpecificFeature.findOne({ roleId: roleId, featureId: featureId })
            res.status(200).send(roleSpecficFeature)
        }

    } catch (error) {
        console.log(error?.message);
    }

}



exports.createUser = async (req, res) => {
    const { name, email, role, password } = req.body

    try {
        await Users.create({ name, email, role, password })
    } catch (error) {
        console.log(error.message);
    }
}




