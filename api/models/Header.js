const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Header = sequelize.define('Header', {
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
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Header;
