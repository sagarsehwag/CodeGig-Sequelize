const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

router.get("/search", (req, res) => {
	const { term } = req.query;
	Gig.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
		.then((gigs) => {
			res.render("gigs", {
				gigs
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/add", (req, res) => {
	res.render("add");
});

// Add Gig
router.post("/add", (req, res) => {
	let { title, technologies, budget, description, contact_email } = req.body;
	let errors = [];

	// Validate Fields
	if (!title) errors.push({ text: "Please add a title" });
	if (!technologies) errors.push({ text: "Please add some technolgies" });
	if (!description) errors.push({ text: "Please add a description" });
	if (!contact_email) errors.push({ text: "Please add a contact email" });

	// Check for Errors
	if (errors.length > 0) {
		res.render("add", {
			errors: errors,
			title,
			technologies,
			description,
			budget,
			contact_email
		});
	} else {
		if (!budget) budget = "Unknown";
		else budget = `$${budget}`;

		Gig.create({
			title,
			technologies,
			description,
			budget,
			contact_email
		})
			.then((gig) => res.redirect("/gigs"))
			.catch((err) => console.log(err));
	}
});

module.exports = router;
