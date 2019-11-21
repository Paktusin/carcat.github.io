const router = require('express').Router();
const database = require('./database');


router.get('/', (req, res, next) => {
    const body_id = parseInt(req.query.body_id);
    if (!body_id) return next();
    database.where('modif', 'body_id', body_id).then(snapshot => {
        return res.json(Object.values(snapshot.val()))
    })
});


module.exports = router;
