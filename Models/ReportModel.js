const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;


const ReportSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    Report: { type: String, required: true },
});
const ReportModel = mongoose.model('Report', ReportSchema);
module.exports = ReportModel;