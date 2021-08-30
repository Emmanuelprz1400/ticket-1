const {DataTypes} = require('sequelize');
const sequelize = require('./db.connection');
const Income = require('./db.income.model');
const DirectCost = require('./db.directCost.model');
const AdminExpenses = require('./db.adminexpenses.model');
const Resources =  require('./db.resources.model');

const Period = sequelize.define('period', {
    id_date: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true 
    },
    month: {
        type: DataTypes.STRING(10),
        allowNull: false
    }, 
    age: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    income: {
        type: DataTypes.STRING(10),
        allowNull: false
    }, 
}, {
    timestamps: false
});

Period.hasMany(Resources, {
    foreignKey: 'id_date',
    constraints: true,
    onDelete: 'cascade',
    onUpdate: 'cascade'});

Period.hasMany(DirectCost, {
    foreignKey: 'id_date',
    constraints: true,
    onDelete: 'cascade',
    onUpdate: 'cascade'});

Period.hasMany(AdminExpenses, {
    foreignKey: 'id_date',
    constraints: true,
    onDelete: 'cascade',
    onUpdate: 'cascade'});

Period.hasMany(Income, {
    foreignKey: 'id_date',
    constraints: true,
    onDelete: 'cascade',
    onUpdate: 'cascade'});

module.exports = Period