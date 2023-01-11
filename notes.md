# MERN Stack

- M: MongoDB
- E: Express
- R: React
- N: Node

### Traditional Databases
Databases - collection of tables for ex. (users, products, blogs, movies)
Tables - Primary Key (ID for that record) columns inside the table (username, firstname, lastname, dob)
records - Rows of values that are stored in the table

### Mongo Database

Collections = Tables
Documents = Records

## Getting started Server

- Package.json file (npm init -y (-y just does the init with default settings))
- Install express (npm i express)
- Install Mongoose: (npm i mongoose)
- Install dotenv: (npm i dotenv)
- Update package.json 'main:' field to 'app.js'

## .gitignore
- .gitignore tells your git repo to ignore certain files and folders from being tracked. 
- Create a .gitignore
'/node_modules'

## app.js file

- Add boiler plate code and have the app listen on 4000. 
- require("dotenv").config(); at the top of app.js
- change PORT variables to process.env.PORT

## .env file

- Contains constants that are specific for our environment
- Store items in there that you do not want published 
- Add .env to the gitignore file. 
- Set 'PORT = "4000"' Then make necessary changes in app.js file

## Creating Models
- Boiler plate

```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
// Create the columns here for the collection
})

module.exports = mongoose.model("User", UserSchema)
```
- Models help define what your database collection will look like. 

## Controllers

- They will take in user requests and send back information. 
- Controllers will do the CRUD work from the database

## B crypt (Hashing passwords)

- This will encrypt our password
- 'npm i bcrypt' in order to use it in your files
- To hash the password you can use this example

```js
password: bcrypt.hashSync(req.body.password, 10),
```

- You will need to use bcrypt.compare() to compare the passwords: This will return true of false

```js
const isPasswordMatch = await bcrypt.compare(
      req.body.password, 
      user.password
    );
```

## JWT JSON Web Token
- Used to help identify and authenticate user
- Should be given in user login and signup
- Example code
```js

const token = jwt.sign({id: newUser._id}, process.env.JWT, {expiresIn: 60 * 60 * 24})
    res.json({ user: user, message: 'success', token: token})

```

