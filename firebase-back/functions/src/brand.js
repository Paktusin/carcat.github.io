const router = require('express').Router();
const database = require('./database');

router.get('/', (req, res) => {
    database.all('brand').then(snapshot => {
        return res.json(snapshot.val().filter(el => el))
    })
});

router.get('/:id', (req, res) => {
    database.find('brand', req.params.id).then(snapshot => {
        return res.json(snapshot.val())
    })
});


module.exports = router;
