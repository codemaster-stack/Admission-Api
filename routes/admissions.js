const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const admissionController = require("../controllers/admissionController");

// ------------------------------
// Save Admission Application
// ------------------------------

router.post("/", async (req, res) => {

    try {

        const application = req.body;

        const savedApplication = await Application.create(application);

        res.status(201).json({

            success: true,

            message: "Application saved successfully",

            application: savedApplication

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server error"

        });

    }

});

// ------------------------------
// Track Application
// ------------------------------
router.get(
    "/",
    admissionController.getApplications
);

router.get("/:id", admissionController.getApplication);

router.get(
    "/track/:applicationNumber",
    admissionController.trackApplication
);

module.exports = router;