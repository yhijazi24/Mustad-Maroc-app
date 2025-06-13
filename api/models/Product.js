const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Product = sequelize.define('Product', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  availability: {
    type: DataTypes.STRING
  },
  img: {
    type: DataTypes.JSON, // Array of image URLs
    allowNull: false
  },
  fullDesc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING, // Consider switching to FLOAT or DECIMAL if it's numeric
    allowNull: false
  },
  size: {
    type: DataTypes.JSON,
    allowNull: false
  },
  wheather: {
    type: DataTypes.JSON,
    allowNull: false
  },
  terrain: {
    type: DataTypes.JSON,
    allowNull: false
  },
  activity: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Product;
