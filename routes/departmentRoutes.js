const express = require("express");

const router = express.Router();

const departmentController = require("../controllers/departmentController");

router.post(
    "/admin/departments",
    departmentController.createDepartment
);

router.get(
    "/admin/departments/:facultyId",
    departmentController.getDepartments
);

router.put(
    "/admin/departments/:id",
    departmentController.updateDepartment
);

router.delete(
    "/admin/departments/:id",
    departmentController.deleteDepartment
);

module.exports = router;