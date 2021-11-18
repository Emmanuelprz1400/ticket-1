const {DataTypes} = require('sequelize');
const sequelize = require('./db.connection');
const Income = require('./db.income.model');
const DirectCost = require('./db.directCost.model');
const AdminExpenses = require('./db.adminexpenses.model');

const Concept = sequelize.define('concept', {
    id_concept: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true 
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false
    }
},{
    timestamps: false
});

Concept.hasMany(AdminExpenses, {
    foreignKey: 'id_concept',
    constraints: true,
    onDelete: 'cascade',
    onUpdate: 'cascade'});

Concept.hasMany(Income, {
    foreignKey: 'id_concept',
    constraints: true,
    onDelete: 'cascade',
    onUpdate: 'cascade'});

Concept.hasMany(DirectCost, {
    foreignKey: 'id_concept',
    constraints: true,
    onDelete: 'cascade',
    onUpdate: 'cascade'});

module.exports = Concept