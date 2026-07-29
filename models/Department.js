const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({

    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },

    name: {
        type: String,
        required: true
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Department", departmentSchema);