const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement= require('mongoose-sequence')(mongoose)
const OrderSchema = new Schema({
    orderId: { type: Number, unique:true },
   userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   products: [
    {
        productId:{ type: Number, ref: 'Product' },
        name: { type: String },
        price: { type: Number },
        image: { type: String },
        quantity: { type: Number }
    }
  ],
   
    totalPrice: { type: Number, required: true },
    Checkedout:{type:Boolean,default:false},
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});
OrderSchema.plugin(autoIncrement,{id:'order-seq' ,inc_field: 'orderId' });
const order = mongoose.model('Order', OrderSchema);
module.exports = order;