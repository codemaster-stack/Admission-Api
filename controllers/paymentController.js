const flutterwave = require("../services/flutterwave");
const Application = require("../models/Application");


exports.verifyPayment = async (req, res) => {
      console.log("verifyPayment controller reached");
      console.log(req.body);
    try {

        const {

    transaction_id,

    applicationId

} = req.body;

       if (!transaction_id || !applicationId) {

    return res.status(400).json({

        success: false,

        message: "Application or transaction missing."

    });

}

        const response = await flutterwave.get(

            `/transactions/${transaction_id}/verify`

        );

        const payment = response.data.data;

        if (payment.status !== "successful") {

            return res.status(400).json({

                success: false,

                message: "Payment not successful."

            });

        }

      const savedApplication =
await Application.findByIdAndUpdate(

    applicationId,

    {

        paymentStatus: "Paid",

        applicationStatus: "Submitted",

        transactionId: payment.id,

        txRef: payment.tx_ref,

        currency: payment.currency,

        amountPaid: payment.amount,

        paymentMethod: payment.payment_type,

        paidAt: payment.created_at

    },

    {

        new: true

    }

);

        return res.json({

            success: true,

            application: savedApplication

        });

    }

    catch (err) {

        console.error(err.response?.data || err);

        res.status(500).json({

            success: false,

            message: "Verification failed."

        });

    }

};