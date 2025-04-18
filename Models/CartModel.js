
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    productname:{type:String},
    productPrice:{type:Number},
    productImage:{type:String},
    cartItemId: { type: Number, unique: true },
    userId: { type: String, required: true, index: true },
    productId: { type: Number, required: true, index: true },
    quantity: { type: Number, default: 1, min: 1 }
}, {
    timestamps: true,
    collection: 'cartitems'
});

CartSchema.plugin(autoIncrement, {
    inc_field: 'cartItemId',
    id: 'cartitem_seq',
    start_seq: 1,
    collection_name: 'cart_counters'
});
module.exports = mongoose.model('Cart', CartSchema);