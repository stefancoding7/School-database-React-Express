'use strict';

const express = require('express');

// Construct a router instance.
const router = express.Router();
const { authenticateUser } = require("../middleware/auth-user");
const Users = require('../models').Users;
const Courses = require('../models').Courses;
const asyncHandler = require('../middleware/asyncHandler')



/***
 * ----------------USER ROUTES-------------------------
 */

/***
 * return the currently authenticated user along with a 200 HTTP status code
 */
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  
//  console.log(user);
  res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
  })
}));


/***
 * Create a new user, set the Location header to "/", and return a 201 HTTP status code
 */
router.post('/users', asyncHandler(async (req, res) => {
  try {
   
    await Users.create(req.body);
    res.location('/');
    res.status(201).json({ "message": "Account successfully created!"})
    
  } catch(error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

module.exports = router;