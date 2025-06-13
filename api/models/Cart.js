const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  products: {
    type: DataTypes.JSON, // Array of products (each with productId and quantity)
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Cart;
