const express = require("express");
const axios = require("axios");

const router = express.Router();

const paymentController =
require("../controllers/paymentController");

router.post(
    "/verify",
    paymentController.verifyPayment
);
// ------------------------------
// INITIALIZE PAYMENT
// ------------------------------

router.post("/initialize", async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            phone,
            country,
            amount
        } = req.body;

        const currencyMap = {
            Nigeria: "NGN",
            Ghana: "GHS",
            Kenya: "KES",
            "South Africa": "ZAR",
            "United Kingdom": "GBP",
            "United States": "USD",
            Canada: "CAD",
            Australia: "AUD",
            India: "INR"
        };

        const currency = currencyMap[country] || "USD";

        const response = await axios.post(

            "https://api.flutterwave.com/v3/payments",

            {
                tx_ref: "CAMPUSHUB-" + Date.now(),

                amount,

                currency,

                redirect_url: "http://localhost:5500/success.html",

                customer: {
                    email,
                    phonenumber: phone,
                    name: `${firstName} ${lastName}`
                },

                customizations: {
                    title: "CampusHub Admissions",
                    description: "Admission Application Fee",
                    logo: "https://yourdomain.com/logo.png"
                }
            },

            {
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
                }
            }

        );

        res.json(response.data);

    }

    catch (err) {

        console.error(err.response?.data || err.message);

        res.status(500).json({
            message: "Unable to initialize payment"
        });

    }

});


module.exports = router;


