const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true,unique:true},
   phoneNumber: { type: String, required: true,unique:true },
});
ContactSchema.plugin(autoIncrement,{id:'contact-seq' ,inc_field: 'contactId' });
const ContactModel = mongoose.model('Contact', ContactSchema);
module.exports = ContactModel;