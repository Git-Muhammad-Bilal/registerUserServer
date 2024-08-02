const mongoose = require('mongoose');

const Schema = mongoose.Schema;


    const FeatureSchema = new Schema({
    featureName: {
        type: String,
        required: true
    },
    permissions: [{
        type: Schema.Types.ObjectId ,
        ref: 'Permission',
        required: false
    }],

    fId:{
        type:Number
    }

  
})

FeatureSchema.pre('save',function (next){
    let features = ['Roles', 'Users', 'Todos', 'Notes'];
    let ind = features.indexOf(this.featureName)
    this.fId = ind+1
  next()
})

module.exports = mongoose.model('Features', FeatureSchema)


// { productId:{  type: Schema.Types.ObjectId,
//   ref:'Products',
//   required: true
// }















