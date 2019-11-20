const express = require('express');
const router = express.Router();
const database = require('./database');

function mapBrand(res) {
    if (Array.isArray(res))
        return res.map(el => mapBrand(el));
    else
        return {id: res.id, name: res.name}
}

router.get('/', (req, res) => {
    database.ref('brand/').once('value').then(snapshot => {
        return res.json(mapBrand(snapshot.val()))
    })
});

router.get('/:id', (req, res) => {
    database.ref('brand/' + req.params.id).once('value').then(snapshot => {
        return res.json(mapBrand(snapshot.val()))
    })
});

module.exports = router;
