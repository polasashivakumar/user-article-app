import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userRoute } from "./APIs/UserApi.js";
import cookieParser from "cookie-parser";
import { adminRoute } from "./APIs/AdminApi.js";
import { authorRoute } from "./APIs/AuthorApi.js";
import { commonRouter } from "./APIs/CommonApi.js";
import cors from "cors";

config(); // load environment variables

// Create express application
const app = exp();


// -------------------
// CORS Middleware
// -------------------
app.use(
  cors({
    origin: ["http://localhost:5173","https://user-article-app.vercel.app"],
    credentials: true
  })
);


// -------------------
// Body Parser
// -------------------
app.use(exp.json());


// -------------------
// Cookie Parser
// -------------------
app.use(cookieParser());


// -------------------
// Connect APIs
// -------------------
app.use("/user-api", userRoute);
app.use("/author-api", authorRoute);
app.use("/admin-api", adminRoute);
app.use("/common-api", commonRouter);


// -------------------
// Connect to Database
// -------------------
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log(" DB connection success");

    // start server
    app.listen(process.env.PORT, () =>
      console.log(` Server started on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.log("Error in DB connection", err);
  }
};

connectDB();


// -------------------
// Invalid Path Middleware
// -------------------
app.use((req, res, next) => {
  console.log("Invalid path:", req.url);
  res.status(404).json({
    message: `${req.url} is invalid path`
  });
});


// -------------------
// Global Error Handler
// -------------------
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  let message = err.message || "Unexpected error";
  let details;

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    message = "Validation error";
    details = Object.values(err.errors || {}).map((e) => e.message);
  }

  // Invalid ObjectId
  if (err.name === "CastError") {
    message = "Invalid value for field";
    details = [`${err.path} is invalid`];
  }

  // Duplicate key error
  if (err.code === 11000) {
    message = "Duplicate value";
    const fields = Object.keys(err.keyValue || {});
    details = fields.map((f) => `${f} already exists`);
  }

  // Strict mode error
  if (err.name === "StrictModeError") {
    message = "Invalid fields provided";
    details = err.path ? [`${err.path} is not allowed`] : undefined;
  }

  const finalStatus = status === 500 && (err.name || err.code) ? 400 : status;

  const response = {
    message,
    status: finalStatus
  };

  if (details) response.details = details;

  if (!isProduction) {
    response.stack = err.stack;
  }

  console.log("❌ Error:", err);

  res.status(finalStatus).json(response);
});
