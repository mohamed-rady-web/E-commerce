const mongoose = require('mongoose')
const Schema=mongoose.Schema

const Checkoutschema =new Schema({
    productId:{type:Number,ref:'Product'},
    orderId:{type:Number,ref:'Order'},
    checkoutDate:{type:Date,default:Date.now},
    DeleverDate:{type:Date,default:(Date.now)+(2*24*60*60*1000)},
    Payment:{type:String,default:"in place"},
    orderstatus:{type:String,default:"Coming to you"}
});
module.exports=mongoose.model("checkoutorders",Checkoutschema)