// required external modules
const express = require("express");
const path = require("path");
const router = require("./modules/router");
const model = require("./modules/api");

// app variables
const app = express();
const port = process.env.PORT || 8000;

// use static files from modules folder
app.use('/modules', express.static(path.join(__dirname, 'modules')));

// app config
app.set("view engine", "pug");

// use page routes from router
app.use("/", router);

// server activation
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
})

