const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database', 'mustad.sqlite'), // adjust if different
  logging: false
});

module.exports = sequelize;
