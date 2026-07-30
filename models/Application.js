const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    applicationNumber: {
    type: String,
    unique: true,
    required: true
   },

    firstName: {
    type: String,
    required: true,
    trim: true
    },

    lastName:{
    type: String,
    required: true,
    trim: true
    },

    email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
    },

    phone:{
    type: String,
    required: true,
    trim: true
    },

    country:{
    type: String,
    required: true,
    trim: true
    },

    institutionType:{
    type: String,
    required: true,
    trim: true
    },

    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },

    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
         required: true
    },

    programme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Programme",
         required: true
    },

    session: {
    type: String,
    required: true
    },

    guardianName: String,

    guardianPhone: String,

    guardianRelation: String,

    previousSchool: String,

    qualification: String,

    qualificationName: String,

    graduationYear: Number,

    passport: String,

    result: String,

    paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
   },

    transactionId: String,

    txRef: String,

    currency: String,

    amountPaid: Number,

    paymentMethod: String,

    paidAt: Date,

    applicationStatus: {
    type: String,
    enum: ["Draft", "Submitted", "Pending Review", "Approved", "Rejected"],
    default: "Draft"
    },
    
    adminRemark: {
    type: String,
    default: ""
    },

     reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
    },
    offerLetter: String,

    offerDate: Date,

    reviewedAt: Date,

    remarks: String,

    amount: {
    type: Number,
    required: true
    },

   }, {

    timestamps: true

});


module.exports = mongoose.model("Application", applicationSchema);