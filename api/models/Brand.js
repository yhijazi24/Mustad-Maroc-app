const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Brand = sequelize.define('Brand', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  desc: {
    type: DataTypes.JSON, // Equivalent to an Array in Mongoose
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Brand;
