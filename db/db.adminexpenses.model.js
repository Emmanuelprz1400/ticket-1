const {DataTypes} = require('sequelize');
const sequelize = require('../db/db.connection');

const AdminExpenses = sequelize.define('adminExpenses', {
    id_expenses: {
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

module.exports = AdminExpenses