const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  products: {
    type: DataTypes.JSON, // Stores array of { productId, quantity }
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  address: {
    type: DataTypes.JSON, // To store object structure for address
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending"
  }
}, {
  timestamps: true
});

module.exports = Order;
