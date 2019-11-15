const Body = require('autoParser/model/Body');

const BodyNested = Object.assign({}, Body);

BodyNested.findAll = (query = {}) => {
    return Body.findAll(query);
};

BodyNested.findById = (id) => {
    return Body.find({where: {id: id}, include: ['mods']});
};

module.exports = BodyNested;