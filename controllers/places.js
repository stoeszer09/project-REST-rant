const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('GET /places test')
})

module.exports = router