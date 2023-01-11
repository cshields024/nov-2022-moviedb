//Take the token that is provided by the request Object and add it to headers: authorization)
//Check to see if token is expired. If it is expired provide response to user.
//If the token is valid we will create a variable to contain the users information. based off of the id we captured in the creation of the token. 

const jwt = require('jsonwebtoken')
const User = require('../model/user.model')

const validateSession = async(req, res, next) => {
  try {
    const token = req.headers.authorization  
    // verify the token to see if it is expired. 
    const decodedToken = await jwt.verify(token, process.env.JWT)
    console.log(decodedToken)
    const user = await User.findById(decodedToken.id)
    if(!user) {
      throw Error ("user not found")
    }
    req.user = user
    return next();
  } catch (error) {
    res.json({ message: error.message })
  }
}

module.exports = validateSession