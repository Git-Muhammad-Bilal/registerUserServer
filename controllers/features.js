const Features = require('../modals/Features')
const PermissionsModal = require('../modals/Permisssions')



exports.getMeta = async (req, res) => {

    try {
        
        let features = await Features.find();
        let permissions = await PermissionsModal.find()
        res.send({ features, permissions })

    } catch (error) {
        console.log(error.message);
    }
}
exports.getFeatureInfo = async (req, res) => {
    const { featureName, RoleId } = req.body

    try {
        let rolesData = await Features.findOne({ featureName: featureName })

        res.send(rolesData)

    } catch (error) {
        console.log(error.message);
    }
}


