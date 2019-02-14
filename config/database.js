const Sequelize = require("sequelize");
module.exports = new Sequelize("codegig", "sagar", "8800", {
	host: "localhost",
	dialect: "sqlite",
	operatorsAliases: false,
	logging: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},

	storage: "./database.sqlite"
});
