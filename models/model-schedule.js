var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ModalSchedule = new Schema({
    title: String,
    date: Number,
    privacity: String,
    description: String
});

module.exports = mongoose.model('schedule', ModalSchedule);
