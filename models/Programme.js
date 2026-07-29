const mongoose = require("mongoose");

const programmeSchema = new mongoose.Schema({

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        default: 4
    },

    level: {
        type: String,
        default: "Bachelor"
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Programme", programmeSchema);