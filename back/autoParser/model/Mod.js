const db = require('../db');
const Sequelize = require('sequelize');

const Body = db.define('mod', {
    engine: Sequelize.STRING,
    gearbox: Sequelize.STRING,
    drive: Sequelize.STRING,
    consum: Sequelize.STRING,
    accel: Sequelize.STRING,
}, {
    tableName: 'modif',
    timestamps: false
});

module.exports = Body;