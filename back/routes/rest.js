const express = require('express');

const rest = (entity) => {
    const router = express.Router();
    router.get('/', function (req, res, next) {
        let query = {};
        for (let key of Object.keys(req.query)) {
            if (entity.rawAttributes.hasOwnProperty(key)) {
                query[key] = req.query[key];
            }
        }
        entity.findAll({where: query, limit: 250}).then(brands => res.json(brands));
    });

    router.get('/:id', function (req, res, next) {
        entity.findById(req.params.id)
            .then(brand => {
                if (brand) {
                    res.json(brand);
                } else {
                    res.status(404);
                    next();
                }
            });
    });
    return router
};

module.exports = rest;
