const Gen = require('autoParser/model/Gen');

const GenNested = Object.assign({},Gen);

GenNested.findAll = (query = {}) => {
    query.include = ['bodies'];
    return Gen.findAll(query);
};

module.exports = GenNested;