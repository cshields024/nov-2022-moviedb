const router = require("express").Router()
const Movie = require('../model/movie.model')
const validateSession = require('../middleware/validate-session')
router.post('/add', validateSession, async(req, res) => {
  try {
    const movie = new Movie ({
      movieTitle: req.body.movieTitle,
      movieDescription: req.body.movieDescription,
      movieYear: req.body.movieYear,
      isCurrentlyInTheaters: req.body.isCurrentlyInTheaters,
      rating: req.body.rating,
      owner_id: req.user._id
    })
    const newMovie = await movie.save()
    res.json({
      movie: newMovie,
      message: 'Movie was added to collection'
    })
  } catch(error) {
    res.json({ message: error.message })
  }
})

router.get('/', validateSession, async(req, res) => {
  try {
    const movie = await Movie.find()
    res.json({ movie: movie, message: 'success' })
  } catch(error) {
    res.json({ message: error.message })
  }
})

router.get('/:id', validateSession, async(req, res) => {
  try {
    const movie = await Movie.findById({ _id: req.params.id });
    res.json({movie: movie, message: 'success'})
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/owner', validateSession, async(req, res) => {
  try {
    const movie = await Movie.find({owner_id: req.user._id})
    res.json({movie: movie, message: 'success'})
  } catch (error) {
    res.json({message: error.message})
  }
})

router.delete('/delete/:id', validateSession, async(req, res) => {
  try {
    const isOwner = await Movie.find({_id: req.params.id, owner_id: req.user._id})
    
    if(isOwner.length == 0) {
      throw new Error ('The id supplied for movie record is not owned by user')
    }
    const deletedMovie = await Movie.deleteOne({_id: req.params.id, owner_id: req.user._id})
    res.json({ 
      deletedMovie: deletedMovie,
      message: deletedMovie.deletedCount > 0 ? "movie was deleted" : "movie was not removed"
    })
  } catch(error) {
    res.json({ message: error.message })
  }
})

router.put('/update/:id', validateSession, async(req, res) => {
  try {
    const filter = {_id: req.params.id, owner_id: req.user._id}
    const update = req.body
    const returnOptions = { new: true }
    const movie = await Movie.findOneAndUpdate(filter, update, returnOptions)
    
    res.json({
      message: movie ? 'movie updated' : 'Movie not updated',
      movie: movie ? movie : {}
    })

  } catch(error) {
    res.json({ message: error.message })
  }
})


module.exports = router