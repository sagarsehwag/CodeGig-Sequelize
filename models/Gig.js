const Sequelize = require("sequelize");
const db = require("../config/database");

const Gig = db.define("gig", {
	title: {
		type: Sequelize.STRING
	},
	technologies: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	},
	budget: {
		type: Sequelize.STRING
	},
	contactEmail: {
		type: Sequelize.STRING
	}
});

Gig.sync();

module.exports = Gig;
