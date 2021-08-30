const {DataTypes} = require('sequelize');
const sequelize = require('./db.connection');

const Resources = sequelize.define('resources', {
    id_resource: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true 
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cost: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    percentage: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = Resources