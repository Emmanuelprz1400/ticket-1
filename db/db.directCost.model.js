const {DataTypes} = require('sequelize');
const sequelize = require('./db.connection');

const DirectCost = sequelize.define('direct_cost', {
    id_costD: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true 
    },
    value: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = DirectCost