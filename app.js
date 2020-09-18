require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const User = require("./models/User.model");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./configs/passport");

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// require database configuration
require("./configs/db.config");
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

//Add Sesion settings here :
app.use(
  session({
    secret: "8PXZPuAN|RO-a,{w~cG@W[FQFn>$W$",
    resave: true,
    saveUninitialized: true,
  })
);

//Passport initialize and passport session here:

app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);
const authRoutes = require("./routes/auth-routes");
app.use("/api", authRoutes);

module.exports = app;
