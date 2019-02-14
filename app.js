const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const sequelize = require("sequelize");

// Initialising Express Middleware
const app = express();
const db = require("./config/database");

db.authenticate()
	.then(() => {
		console.log("SQLite Database Connected");
	})
	.catch((err) => {
		console.log(err);
	});

// General Middlewares ----------------------------------------------------------------------------

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving Static Files
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ------------------------------------------------------------------------------------------------

// Routes -----------------------------------------------------------------------------------------

app.get("/", (req, res) => {
	res.render("index", { layout: "landing" });
});

app.use("/gigs", require("./routes/gigs"));

// ------------------------------------------------------------------------------------------------

// Server Intilisation ----------------------------------------------------------------------------
app.listen(5000, (error) => {
	console.log("Server Started on Port 5000");
});
