// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect(() => {
  console.log('connected to the midterm database')
});

const dataHelpers = require("./public/scripts/dataHelpers.js")(db);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const homeRoutes = require("./routes/home");
const loginRoutes = require("./routes/login");
const pollsRoutes = require("./routes/polls");
const resultsRoutes = require("./routes/api/results");

const apiResultsRoutes = require("./routes/api/results")

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Render HTML
app.use("/api/users", usersRoutes(dataHelpers));
app.use("/api/widgets", widgetsRoutes(dataHelpers));
app.use("/home", homeRoutes(dataHelpers));
app.use("/login", loginRoutes(dataHelpers));
app.use("/polls", pollsRoutes(dataHelpers));
app.use("/results", resultsRoutes(dataHelpers));

// API Routes
app.use("/api/results", apiResultsRoutes(dataHelpers));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.send("welcome to home page");
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
