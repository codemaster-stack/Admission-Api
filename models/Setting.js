const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
    {
        admissionFee: {
            type: Number,
            default: 25
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Setting", settingSchema);