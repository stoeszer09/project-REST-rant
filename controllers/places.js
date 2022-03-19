const router = require('express').Router()
const places = require('../models/places.js')

// Create a NEW place Route
router.get('/new', (req, res) => {
  res.render('places/new')
})

// EDIT a place Route
router.get('/:id/edit', (req, res) => {
  let id = Number(req.params.id)
  if (isNaN(id)) {
    res.render('error404')
  } else if (!places[id]) {
    res.render('error404')
  } else {
    res.render('places/edit', {place: places[id]})
  }
})


router.post('/:id/rant', (req, res) => {
  res.send('<h1>This is the POST /:id/rant route</h1>')
})

// SHOW route to show an index
router.get('/:id', (req, res) => {
  let id = Number(req.params.id)
  if (isNaN(id)) {
    res.render('error404')
  } else if (!places[id]) {
    res.render('error404')
  } else {
    res.render('places/show', { place: places[id], id})
  }
})

// When DELETING a place go back to the index page
router.delete('/:id', (req, res) => {
  let id = Number(req.params.id)
  if (isNaN(id)) {
    res.render('error404')
  } else if (!places[id]) {
    res.render('error404')
  } else {
    places.splice(id, 1)
    res.redirect('/places')
  }
})

router.put('/:id', (req, res) => {
  res.send('<h1>This is the PUT /:id</h1>')
})

// Base INDEX Route
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