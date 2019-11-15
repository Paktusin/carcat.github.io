const db = require('../db');
const Sequelize = require('sequelize');
const Gen = require('./Gen');

const Model = db.define('model', {
    name: Sequelize.STRING,
    label: Sequelize.STRING,
}, {
    tableName: 'model',
    timestamps: false,
});

Model.hasMany(Gen, {foreignKey: 'model_id', sourceKey: 'id', as: 'gens'});
Gen.belongsTo(Model, {foreignKey: 'model_id', targetKey: 'id', as: 'model'});

module.exports = Model;