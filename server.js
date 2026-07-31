const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const admissionRoutes = require("./routes/admissions");
const schoolRoutes = require("./routes/schools");
const paymentRoutes = require("./routes/payments");
const adminRoutes = require("./routes/admin");
const programmeRoutes = require("./routes/programmes");
const departmentRoutes = require("./routes/departmentRoutes");
const settingsRoute = require("./routes/settings");


const app = express();

// Connect MongoDB
connectDB();

const cors = require("cors");

const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://my-admission.vercel.app"
];

app.use(cors({

    origin: function(origin, callback){

        if(!origin) return callback(null, true);

        if(allowedOrigins.includes(origin)){

            callback(null, true);

        }else{

            callback(new Error("Not allowed by CORS"));

        }

    }

}));

app.use(express.json());


// Route

app.use("/api/admin", adminRoutes);

app.use("/api", departmentRoutes);

app.use("/api", programmeRoutes);

app.use("/api/admissions", admissionRoutes);

app.use("/api/schools", schoolRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/settings", settingsRoute);



app.get("/", (req,res)=>{

    res.json({
        message:"CampusHub Admission API running"
    });

});



const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `CampusHub API running on port ${PORT}`
    );

});