const router = require('express').Router()
const db = require('../models')

// INDEX
router.get('/', (req, res) => {
  db.Place.find()
    .then((places) => {
      res.render('places/index', { places })
    })
    .catch(err => {
      console.log(err)
      res.render('error404')
    })
})

// POST NEW
router.post('/', (req, res) => {
  db.Place.create(req.body)
    .then(() => {
      res.redirect('/places')
    })
    .catch(err => {
      if (err && err.name === 'ValidationError') {
        let message = 'Validation Error: '

        for (var field in err.errors) {
          message += `${field} was ${err.errors[field].value}. `
          message += `${err.errors[field].message}`
        }
        
        res.render('places/new', { message })
      } else {
        res.render('error404')
      }
    })
})

// NEW VIEW
router.get('/new', (req, res) => {
  res.render('places/new')
})

// SHOW
router.get('/:id', (req, res) => {
  db.Place.findById(req.params.id)
    .populate('comments')
    .then(place => {
      res.render('places/show', { place })
    })
    .catch(err => {
      console.log('err', err)
      res.render('error404')
    })
})

// EDIT - page view
router.get('/:id/edit', async (req, res) => {
  try {
    let place = await db.Place.findById(req.params.id)
    res.render('places/edit', {
      place
    })
  } catch(e) {
    console.log('error', e)
    res.render('error404')
  }
})

// UPDATE - db
router.put('/:id', async (req, res) => {
  try {
    await db.Place.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/places/${req.params.id}`)
  } catch(e) {
    console.log('error', e)
    res.render('error404')
  }
})

// DELETE rant
router.delete('/:id/comment/:rantId', async (req, res) => {
  try {
    await db.Comment.findByIdAndDelete(req.params.rantId)
    let place = await db.Place.findById(req.params.id)
    console.log('place ===>', place.comments)
    res.render('places/show')
  } catch(e) {
    res.render('error404')
  }
})

// DELETE place
router.delete('/:id', async (req, res) => {
  try {
    await db.Place.findByIdAndDelete(req.params.id)
    res.redirect('/places')
  } catch(e) {
    console.log('error', e)
    res.render('error404')
  }
})

// RANT
router.post('/:id/rant', (req, res) => {
  req.body.rant = req.body.rant ? true : false
  db.Place.findById(req.params.id)
    .then(place => {
      db.Comment.create(req.body)
        .then(comment => {
          place.comments.push(comment.id)
          place.save()
          .then(() => {
            res.redirect(`/places/${req.params.id}`)
          })
        })
        .catch(err => {
          res.render('error404')
        })
    })
    .catch(err => {
      res.render('error404')
    })
})

module.exports = router