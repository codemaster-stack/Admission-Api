const Programme = require("../models/Programme");

// Create Programme
exports.createProgramme = async (req, res) => {

    try {

        const programme = await Programme.create(req.body);

        res.json({
            success: true,
            programme
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


// Get All Programmes
exports.getAllProgrammes = async (req, res) => {

    try {

        const programmes = await Programme
            .find()
            .populate("department", "name")
            .sort({ name: 1 });

        res.json(programmes);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


// Get Programmes by Department
exports.getProgrammes = async (req, res) => {

    try {

        const programmes = await Programme.find({
            department: req.params.departmentId
        }).sort({ name: 1 });

        res.json(programmes);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Update Programme
exports.updateProgramme = async (req, res) => {

    try {

        await Programme.findByIdAndUpdate(
            req.params.id,
            req.body
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

// Delete Programme
exports.deleteProgramme = async (req, res) => {

    try {

        await Programme.findByIdAndDelete(req.params.id);

        res.json({
            success: true
        });

    } catch (err) {

        res.status(500).json({
            success: false
        });

    }

};