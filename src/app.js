// Core modules
const path = require("path");
const fs = require("fs");

// NPM modules
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

/**======================
 *       Variables
 *=======================**/
// Data
const worksData = JSON.parse(fs.readFileSync("public/data/works.json"));

// Setup EJS engine and views location
app.set("view engine", "ejs");
app.set("views", viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(bodyParser.json());

/**========================================================================
 *                           CODE START
 *========================================================================**/

/**============================================
 *                   ROUTING
 *=============================================**/

app.get("/", (req, res) => {
    res.render("index", {
        worksData: worksData,
        dataPerWorkCategory: categories,
    });
});

app.listen(port, async () => {
    console.log(`Server running on port ${port}.`);
});

/**============================================
 *                  WORKS
 *=============================================**/

const categories = {};

Object.keys(worksData).forEach((category) => {
    const dataAttribute = category;
    const projectNameString = Object.keys(worksData[category])[0];
    const projects = worksData[category][projectNameString];
    categories[dataAttribute] = projects;

    if (category === "css") {
        console.log('Category with key "css":', projects);
    }
});
