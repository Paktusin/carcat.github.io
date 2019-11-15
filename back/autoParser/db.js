const mysql = require('mysql2');
const Sequelize = require('sequelize');
const config = {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
};

sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql'
});

module.exports = sequelize;