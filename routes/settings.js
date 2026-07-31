const express = require("express");

const router = express.Router();

const settingsController = require("../controllers/settingsController");


// GET SETTINGS
router.get(
    "/",
    settingsController.getSettings
);


// UPDATE SETTINGS
router.patch(
    "/",
    settingsController.updateSettings
);


module.exports = router;