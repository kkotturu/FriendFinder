// sett up dependencies 
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Hey, Node - we have an express app
var app = express();

// create a port for localhost(using postman in this instance)
var PORT = process.env.PORT || 3000;

// express middleware for serving static files 
app.use(express.static(__dirname + "/app/public"));

// set up body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// all routes - that's where we are getting our data from 
require("./app/routing/api_routes.js")(app);

// html routes
require("./app/routing/html_routes.js")(app);
// set up a listener
app.listen(PORT, function () {
    console.log("app listen on port: ", PORT);
});




