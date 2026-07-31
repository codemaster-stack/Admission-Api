const express = require("express");
const Department = require("../models/Department");
const router = express.Router();
const Programme = require("../models/Programme");
const importSchools = require("../services/importSchools");
const Faculty = require("../models/Faculty");
const { createAdmin, loginAdmin } = require("../controllers/adminController");



router.post("/create",createAdmin);


router.post("/login",loginAdmin);

router.get("/import-schools", async (req, res) => {

    const result = await importSchools();

    res.json(result);

});


router.post("/faculties", async (req, res) => {

    try {

        const faculty = await Faculty.create({

            school: req.body.school,

            name: req.body.name

        });

        res.json({

            success: true,

            faculty

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


router.post("/departments", async (req, res) => {

    try {

        const department = await Department.create({

            faculty: req.body.faculty,

            name: req.body.name

        });

        res.json({

            success: true,

            department

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});



router.post("/programmes", async (req, res) => {

    try {

        const programme = await Programme.create({

            department: req.body.department,

            name: req.body.name,

            duration: req.body.duration,

            level: req.body.level

        });

        res.json({

            success: true,

            programme

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});




router.get("/faculties/:schoolId", async (req, res) => {

    try {

        const faculties = await Faculty
            .find({ school: req.params.schoolId })
            .sort({ name: 1 });

        res.json(faculties);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


router.delete("/faculties/:id", async (req, res) => {

    try {

        await Faculty.findByIdAndDelete(req.params.id);

        res.json({

            success: true

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


router.put("/faculties/:id", async (req, res) => {

    try {

        await Faculty.findByIdAndUpdate(

            req.params.id,

            {

                name: req.body.name

            }

        );

        res.json({

            success: true

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


router.put("/departments/:id", async (req, res) => {

    try {

        await Department.findByIdAndUpdate(

            req.params.id,

            {

                name: req.body.name

            }

        );

        res.json({

            success: true

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


module.exports = router;


