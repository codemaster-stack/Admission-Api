const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Application = require("../models/Application");
const admissionController = require("../controllers/admissionController");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const auth = require("../middleware/auth");

// ------------------------------
// Save Admission Application
// ------------------------------

router.post(
    "/",
    upload.fields([
        {
            name: "passport",
            maxCount: 1
        },
        {
            name: "result",
            maxCount: 1
        }
    ]),
    async (req, res) => {

        try {


const application = { ...req.body };

if (req.files.passport) {

    const passportUpload =
        await uploadToCloudinary(
            req.files.passport[0],
            "campushub/passports"
        );

    application.passport =
        passportUpload.secure_url;

}

if (req.files.result) {

    const resultUpload =
        await uploadToCloudinary(
            req.files.result[0],
            "campushub/results"
        );

    application.result =
        resultUpload.secure_url;

}

const savedApplication =
await Application.create(application);

            res.status(201).json({

                success: true,

                message: "Application saved successfully",

                application: savedApplication

            });

        }

        catch (error) {

    console.error("UPLOAD ERROR:", error);

    res.status(500).json({

        success: false,

        message: error.message

    });

}

    }
);

// ------------------------------
// Track Application
// ------------------------------
router.get(
    "/",
    admissionController.getApplications
);

router.get(
    "/track/:applicationNumber",
    admissionController.trackApplication
);

router.patch(
    "/:id/status",
    auth,
    admissionController.updateApplicationStatus
);

router.get("/:id", admissionController.getApplication);



module.exports = router;