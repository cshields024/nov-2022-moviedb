const router = require('express').Router();
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// signup route
// break down the url to two levels. user = first level and belongs on app.js signup is the second level and belongs in our controller. 
router.post('/signup', async(req, res) => {
  // create a new object based off the model schema (ie User)
  // try catch we want to try and save the data but if we get an error we want to send back the error message

  try {
    const user = new User ({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    })
    const newUser = await user.save()
    // After we successfully generate a NEW user we can generate a token
    const token = jwt.sign({id: newUser._id} , "secret message", {
      expiresIn: 60 * 60 * 24
    })
    res.json({
      user: newUser,
      message: 'success',
      token: token
    })
  } catch(error) {
    res.json({message: error.message})
  }
})

router.post('/login', async(req, res) => {
  try {
    // check our database to see if the email that is given is found in our database.
    //if we found a document in the database validate that password matches. 
    const user = await User.findOne({email: req.body.email})
    if (!user) {
      throw new Error('user not found')
    }
  
    const isPasswordMatch = await bcrypt.compare(
      req.body.password, 
      user.password
    ); 
    if(!isPasswordMatch) {
      throw new Error('Passwords do not match')
    }
    const token = jwt.sign({id: user._id}, process.env.JWT, {
      expiresIn: 60 * 60 * 24
    })
    res.json({ 
      user: user, 
      message: 'success', 
      token: token
    })
  } catch (error) {
    res.json({message: error.message})
  }
})

module.exports = router;