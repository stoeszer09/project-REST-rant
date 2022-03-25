const db = require('../models')

async function seed() {
  let place = await db.Place.findOne({ name: 'H-Thai-ML'})

  // Fake Sample Comment
  let comment = await db.Comment.create({
    author: 'Famished Fran', 
    rant: false,
    stars: 5.0,
    content: 'Wow, simply amazing! Highly recommended!'
  })

  // Add that comment to the places comment array.
  place.comments.push(comment.id)

  // save the place now that it has a comment
  await place.save()

  // Exit the program
  process.exit()
}

seed()