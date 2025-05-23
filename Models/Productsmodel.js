const { request } = require('express');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const ratingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true }
  }, { _id: false });
const ProductSchema = new Schema({
    productId: {type: Number,unique: true, index: true},
    name: { type: String, required: true,unique: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    CoverImage: { type: String, required: true },
    productImage: {
        type: [String],
        default: [],
        required: true,
    },
    showImage:{ type: String,required: true },
    quantityinorder:{type:Number,default:0},
    category: { type: String, required: true },
    stockQuantity: { type: Number, default: 0, min: 0 },
    ratings: [ratingSchema],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0, min: 0 },
    orderCount: { type: Number, default: 0, min: 0 },
    isInFlashSale:{type:Boolean,default:false}
}, { timestamps:true});
ProductSchema.plugin(autoIncrement, {
    inc_field: 'productId',
    id: 'product_seq',
    start_seq: 1,
    disableHooks: false
});
module.exports = mongoose.model('Product', ProductSchema);