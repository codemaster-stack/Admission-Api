const Department = require("../models/Department");

// Create Department
exports.createDepartment = async (req, res) => {

    try {

        const { faculty, name } = req.body;

        const department = await Department.create({
            faculty,
            name
        });

        res.json({
            success: true,
            department
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Get Departments by Faculty
exports.getDepartments = async (req, res) => {

    try {

        const departments = await Department.find({
            faculty: req.params.facultyId
        }).sort({ name: 1 });

        res.json(departments);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Update Department
exports.updateDepartment = async (req, res) => {

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

    } catch (err) {

        res.status(500).json({
            success: false
        });

    }

};

// Delete Department
exports.deleteDepartment = async (req, res) => {

    try {

        await Department.findByIdAndDelete(req.params.id);

        res.json({
            success: true
        });

    } catch (err) {

        res.status(500).json({
            success: false
        });

    }

};