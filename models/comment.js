const mongoose = require('mongoose')
const Place = require('./places')

let commentSchema = new mongoose.Schema({
  author: { type: String, default: 'Anonymous'},
  rant: { type: Boolean, default: true},
  stars: { type: Number, required: true},
  content: { type: String, default: ''}
})

// commentSchema.post('findOneAndDelete', function() {
//   console.log(this)
// })

module.exports = mongoose.model('Comment', commentSchema)