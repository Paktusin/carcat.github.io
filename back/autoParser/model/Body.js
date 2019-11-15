const db = require('../db');
const Mod = require('./Mod');
const Sequelize = require('sequelize');

const Body = db.define('body', {
    name: Sequelize.STRING,
    label: Sequelize.STRING,
    images: Sequelize.TEXT,
    descr: Sequelize.TEXT,
}, {
    tableName: 'body',
    timestamps: false
});

Body.hasMany(Mod,{foreignKey:'body_id',sourceKey:'id',as:'mods'});
Mod.belongsTo(Body,{foreignKey:'body_id',targetKey:'id',as:'body'});


module.exports = Body;