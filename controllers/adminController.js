const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Create first admin
exports.createAdmin = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {

            return res.status(400).json({

                success: false,
                message: "Admin already exists"

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({

            name,
            email,
            password: hashedPassword

        });

        res.status(201).json({

            success: true,
            message: "Admin created successfully"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Server error"

        });

    }

};


// Admin login
exports.loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {

            return res.status(401).json({

                success: false,
                message: "Invalid email or password"

            });

        }

        const validPassword = await bcrypt.compare(

            password,
            admin.password

        );

        if (!validPassword) {

            return res.status(401).json({

                success: false,
                message: "Invalid email or password"

            });

        }

        const token = jwt.sign(

            {
                id: admin._id,
                email: admin.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.json({

            success: true,

            token,

            admin: {

                id: admin._id,
                name: admin.name,
                email: admin.email

            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Server error"

        });

    }

};


// CampusHub SSO login
exports.ssoLogin = async (req, res) => {
    try {

        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "SSO code is required"
            });
        }

        const response = await fetch(
            `${process.env.CAMPUSHUB_BACKEND_URL}/api/v1/auth/verify-sso`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-sso-secret": process.env.TERTIARY_SSO_SECRET
                },

                body: JSON.stringify({
                    code
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {

            return res.status(401).json({
                success: false,
                message: "Invalid or expired SSO code"
            });

        }

        const { email } = data.user;

        if (!email) {

            return res.status(401).json({
                success: false,
                message: "SSO account email missing"
            });

        }

        // Find matching tertiary admin
        const admin = await Admin.findOne({
            email: email.toLowerCase()
        });

        if (!admin) {

            return res.status(403).json({
                success: false,
                message:
                    "No tertiary admin account matches this CampusHub account"
            });

        }

        // Create the normal tertiary JWT
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }
        );

        return res.json({

            success: true,

            token,

            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }

        });

    }

    catch (error) {

        console.error("SSO LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "SSO login failed"
        });

    }
};