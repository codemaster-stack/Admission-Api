const Setting = require("../models/Setting");

// GET SETTINGS
exports.getSettings = async (req, res) => {

    try {

        let setting = await Setting.findOne();

        if (!setting) {

            setting = await Setting.create({
                admissionFee: 25
            });

        }

        res.json({
            success: true,
            setting
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to load settings."
        });

    }

};


// UPDATE SETTINGS
exports.updateSettings = async (req, res) => {

    try {

        const { admissionFee } = req.body;

        let setting = await Setting.findOne();

        if (!setting) {

            setting = await Setting.create({
                admissionFee
            });

        } else {

            setting.admissionFee = admissionFee;

            await setting.save();

        }

        res.json({

            success: true,

            message: "Admission fee updated successfully.",

            setting

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to update settings."

        });

    }

};