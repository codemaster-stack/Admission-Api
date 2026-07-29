const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    country: String,

    countryCode: String,

    type: {
        type: String,
        default: "University"
    },

    website: String,

    domains: [String],

    logo: String,

    currency: {
        type: String,
        default: "USD"
    },

    admissionFee: {
        type: Number,
        default: 25
    },

    active: {
        type: Boolean,
        default: true
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("School", schoolSchema);