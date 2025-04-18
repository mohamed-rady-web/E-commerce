const mongoose = require ('mongoose')
const schema = mongoose.Schema
const sliderSchema =new schema({
    Image:{type:String,require:true,unique:true},
    Title:{type:String,require:true},
})
module.exports =mongoose.model('slider',sliderSchema)