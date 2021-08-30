const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres://postgres:1e0df3e201a84c4ead78b1036ae43735@localhost:5432/workoutLog");
module.exports = sequelize;
