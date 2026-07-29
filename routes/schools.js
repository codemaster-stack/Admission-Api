const express = require("express");
const School = require("../models/School");

const router = express.Router();

// GET all schools
router.get("/", async (req, res) => {

    try {

        const { country } = req.query;

        let filter = {};

        if (country) {

            filter.country = country;

        }

        const schools = await School
            .find(filter)
            .sort({ name: 1 });

        res.json(schools);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to load schools"

        });

    }

});


router.get("/debug", async (req, res) => {

    const school = await School.findOne();

    res.json(school);

});

router.get("/count", async (req, res) => {

    const count = await School.countDocuments();

    res.json({
        total: count
    });

});


// GET all available countries
router.get("/countries", async (req, res) => {

    try {

        const countries = await School.distinct("country");

        countries.sort();

        res.json(countries);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to load countries"

        });

    }

});

module.exports = router;