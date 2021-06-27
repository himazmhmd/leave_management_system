const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LeaveSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    applicantName: {
        type:String,
    },

    applicantUserType: {
        type:String,
    },
    leaveType: {
        type:String,
    },

    dateTo: {
        type: Date,
    },
    dateFrom: {
        type: Date,
    },
    apointmentDate: {
        type: Date,
    },
    reason: {
        type: String,
    },
    isApproved: {
        type: Boolean,
    },
    location: {
        type: String,
    },
    duration: {
        type: String,
    },
    institute: {
        type: String,
    },


    placeToVisit: {
        type: String,
    },



    



});

module.exports = Leave = mongoose.model('leave', LeaveSchema);
