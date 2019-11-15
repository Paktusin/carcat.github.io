const Model = require('autoParser/model/Model');
const Gen = require('autoParser/model/Gen');
const Brand = require('autoParser/model/Brand');

const ModelNested = Object.assign({}, Model);

ModelNested.findAll = (query = {}) => {
    query.include = {model: Gen, as: 'gens', include: ['bodies']};
    return Model.findAll(query);
};

ModelNested.findById = (id) => {
    return Model.find({
        where: {id: id},
        include: [{model: Gen, as: 'gens', include: ['bodies']}, {model: Brand, as: 'brand'}]
    });
};

module.exports = ModelNested;