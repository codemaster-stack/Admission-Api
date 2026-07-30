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



exports.getApplications = async (req, res) => {

    try {

        const applications = await Application
            .find()
            .populate("school", "name")
            .populate("faculty", "name")
            .populate("department", "name")
            .populate("programme", "name")
            .sort({ createdAt: -1 });

        res.json({

            success: true,

            applications

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};


exports.getApplication = async (req, res) => {

    try {

        const application = await Application
            .findById(req.params.id)
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

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.updateApplicationStatus = async (req, res) => {

    try {

        const { applicationStatus } = req.body;

        const application = await Application.findByIdAndUpdate(

            req.params.id,

            { applicationStatus },

            { new: true }

        );

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

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};