const {DataTypes} = require('sequelize');
const sequelize = require('../db/db.connection');

const Income = sequelize.define('income', {
    id_income: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true 
    },
    value: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
},{
    timestamps: false //date
});

module.exports = Income