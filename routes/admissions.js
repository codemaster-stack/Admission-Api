const express = require("express");

const router = express.Router();
const Application = require("../models/Application");

// Receive student admission application

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


module.exports = router;