// Importación de módulos requeridos
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, null, null, {
    dialect: process.env.DIALECT,
    server: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
        authentication: {
            type: 'default',
            options: {
                encrypt: true,
				userName: process.env.DB_USER,
				password: process.env.DB_PASS
            }
        }
    }
});

module.exports = sequelize;

