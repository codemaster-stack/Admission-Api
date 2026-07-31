const express = require("express");

const router = express.Router();

const programmeController = require("../controllers/programmeController");
const Faculty = require("../models/Faculty");
const Department = require("../models/Department");
const Programme = require("../models/Programme");


// ==============================
// GET FACULTIES BY SCHOOL
// ==============================

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

            message: "Unable to load faculties"

        });

    }

});


// ==============================
// GET DEPARTMENTS BY FACULTY
// ==============================

router.get("/departments/:facultyId", async (req, res) => {

    try {

        const departments = await Department
            .find({ faculty: req.params.facultyId })
            .sort({ name: 1 });

        res.json(departments);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to load departments"

        });

    }

});


// ==============================
// GET PROGRAMMES BY DEPARTMENT
// ==============================

router.get("/programmes/:departmentId", async (req, res) => {

    try {

        const programmes = await Programme
            .find({ department: req.params.departmentId })
            .sort({ name: 1 });

        res.json(programmes);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to load programmes"

        });

    }

});

router.get(
    "/admin/programmes",
    programmeController.getAllProgrammes
);

router.post(
    "/admin/programmes",
    programmeController.createProgramme
);

router.get(
    "/admin/programmes/:departmentId",
    programmeController.getProgrammes
);

router.put(
    "/admin/programmes/:id",
    programmeController.updateProgramme
);

router.delete(
    "/admin/programmes/:id",
    programmeController.deleteProgramme
);


module.exports = router;