const Application = require("../models/Application");

exports.trackApplication = async (req, res) => {

    try {

        const application = await Application
            .findOne({
                applicationNumber: req.params.applicationNumber
            })
            .populate("school", "name")
            .populate("faculty", "name")
            .populate("department", "name")
            .populate("programme", "name");

        if (!application) {

            return res.status(404).json({

                success: false,

                message: "Application not found."

            });

        }

        res.json({

            success: true,

            application

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Server error."

        });

    }

};