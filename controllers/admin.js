let superAdmin = require('../modals/SuperAdmin');


exports.getSuprAdmin = async (req, res) => {
    
    try {
        let data = await superAdmin.find()
        res.status(200).send(data)
        } catch (error) {
        res.status(404).send(error.message)
    }
}
