const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({

    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true
    },

    name: {
        type: String,
        required: true
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Faculty", facultySchema);