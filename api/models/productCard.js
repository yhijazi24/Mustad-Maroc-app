const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const ProductCard = sequelize.define('ProductCard', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = ProductCard;
