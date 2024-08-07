import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth.js";
import * as dotenv from "dotenv";
import { default as cookieParser } from "cookie-parser";
import { adminRouter } from "./routes/admin.js";
import { registrationRouter } from "./routes/registration.js";
import { default as cors } from "cors";
import { formsRouter } from "./routes/forms.js";

// configuring dotenv to enable reading environment variables
dotenv.config();

// creating an instance of express server
const app = express();

//cors
const whitelist = [
    "https://atal-prod.web.app",
    "https://salesiancollegescsd.web.app",
];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    if (whitelist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true, credentials: true }; // Reflect (enable) the requested origin and credentials
    } else {
        corsOptions = { origin: "*", credentials: true }; // Disable credentials for other origins
    }

    callback(null, corsOptions); // Callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

// configuring the json and encode type
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(authRouter);
app.use(adminRouter);
app.use(registrationRouter);
app.use(formsRouter);

mongoose
    .connect(
        `mongodb+srv://${process.env.ATLAS_USER_NAME}:${process.env.ATLAS_PASSWORD}@cluster0.${process.env.ATLAS_CODE}.mongodb.net/${process.env.ATLAS_DB}?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(process.env.PORT || 3000);
    })
    .catch(() => {
        console.log("Error => Cannot connect to the database");
        console.log("Exiting the process");
        process.exit();
    });