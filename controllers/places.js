const router = require('express').Router()

router.get('/new', (req, res) => {
  res.render('places/new')
})

router.get('/:id/edit', (req, res) => {
  res.send('<h1>this is the GET /:id/edit route</h1>')
})

router.post('/:id/rant', (req, res) => {
  res.send('<h1>This is the POST /:id/rant route</h1>')
})

router.get('/:id', (req, res) => {
  res.send('<h1>THis is GET /:id page</h1>')
})

router.put('/:id', (req, res) => {
  res.send('<h1>This is the PUT /:id</h1>')
})

router.post('/', (req, res) => {
  console.log(req.body)
  res.send('<h1>This is the POST /places</h1>')
})

router.get('/', (req, res) => {
    let places = [{
        name: 'H-Thai-ML',
        city: 'Seattle',
        state: 'WA',
        cuisines: 'Thai, Pan-Asian',
        pic: '/images/curry.jpg'
      }, {
        name: 'Coding Cat Cafe',
        city: 'Phoenix',
        state: 'AZ',
        cuisines: 'Coffee, Bakery',
        pic: '/images/coffee.jpg'
      }]

    res.render('places/index', { places })
})

module.exports = router