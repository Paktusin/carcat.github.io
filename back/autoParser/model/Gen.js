const db = require('../db');
const Body = require('./Body.js');
const Sequelize = require('sequelize');

const Gen = db.define('gen', {
    name: Sequelize.STRING,
    years: Sequelize.STRING,
    label: Sequelize.STRING,
}, {
    tableName: 'gen',
    timestamps: false
});

Gen.hasMany(Body,{foreignKey:'gen_id',sourceKey:'id',as:'bodies'});
Body.belongsTo(Gen,{foreignKey:'gen_id',targetKey:'id',as:'gen'});

module.exports = Gen;