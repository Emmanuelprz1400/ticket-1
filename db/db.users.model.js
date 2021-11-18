const {DataTypes} = require('sequelize');
const sequelize = require('../db/db.connection');
const Budget = require('../db/db.budget.model');

const Users = sequelize.define('users', {
     id_user: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true 
    },
	names: {
		type: DataTypes.STRING(25),
		allowNull: false
	},
	last_names: {
		type: DataTypes.STRING(25),
		allowNull: false
	},
	email: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	userName: {
		type: DataTypes.STRING(10),
		allowNull: false
	},
    password: {
		type: DataTypes.STRING(20),
		allowNull: false
	},
	phone_number: {
		type: DataTypes.STRING(10),
		allowNull: false
	},
	active: {
		type: DataTypes.STRING(1),
		allowNull: false
	},
	role: {
		type: DataTypes.STRING(15),
		allowNull: false
	}
}, {
	timestamps: true
});

Users.hasMany(Budget, {
	foreignKey: 'id_user',
	 constraints: true })
	 
module.exports = Users;
