const db = require('../db');
const Sequelize = require('sequelize');
const Model = require('./Model');

const Brand = db.define('brand', {
    name: Sequelize.STRING,
    label: Sequelize.STRING,
    logo: Sequelize.STRING
}, {
    tableName: 'brand',
    timestamps: false
});

Brand.hasMany(Model,{foreignKey:'brand_id',sourceKey:'id',as:'models'});
Model.belongsTo(Brand,{foreignKey:'brand_id',targetKey:'id',as:'brand'});

module.exports = Brand;