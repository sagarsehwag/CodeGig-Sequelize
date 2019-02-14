const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");

// Get Gig List
router.get("/", (req, res) => {
	Gig.findAll()
		.then((gigs) => {
			res.render("gigs", {
				gigs: gigs
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

// Add Gig
router.get("/add", (req, res) => {
	res.render("add");
});

module.exports = router;
