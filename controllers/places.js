const router = require('express').Router()
const places = require('../models/places.js')

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
  if (!req.body.pic) {
    req.body.pic = 'http://placekitten.com/400/400'
  }
  if (!req.body.city) {
    req.body.city = 'Anytown'
  }
  if (!req.body.state) {
    req.body.state = 'USA'
  }

  places.push(req.body)
  res.redirect('/places')
})

router.get('/', (req, res) => {
  res.render('places/index', { places })
})

module.exports = router