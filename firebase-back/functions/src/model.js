const router = require('express').Router();
const database = require('./database');

router.get('/', (req, res, next) => {
    const brand_id = parseInt(req.query.brand_id)
    if (!brand_id) return next();
    database.where('model', 'brand_id', brand_id).then(snapshot => {
        return res.json(Object.values(snapshot.val()))
    })
});

router.get('/:id', (req, res) => {
    database.find('model', req.params.id).then(snapshot => {
        return res.json(snapshot.val().values())
    })
});


module.exports = router;
