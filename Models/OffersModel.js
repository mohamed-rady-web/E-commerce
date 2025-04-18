const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const OfferSchema = new Schema({
    productId:{type:Number},
    offerPercent: { type: String, required: true },
    offerPrice: { type: Number, required: true },
    offerImage: { type: String, required: true },   
    startDate: { type: Date, default:Date.now },
    endDate: { 
        type: Date, 
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
      },
});
OfferSchema.plugin(autoIncrement,{id:'offer-seq' ,inc_field: 'offerId' });
const OfferModel = mongoose.model('Offer', OfferSchema);
module.exports = OfferModel;