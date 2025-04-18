const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    AboutUs: { type: String,},
    name: { type: String, required: true },
    Image: { type: String, required: true },
    Position:{ type: String, required: true },
    linKedIn:{ type: String, required: true },
    Facebook:{ type: String, required: true },
    Instagram:{ type: String, required: true },
})
module.exports = mongoose.model('Admin', AdminSchema);