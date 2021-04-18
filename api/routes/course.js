
'use strict';

const express = require('express');

// Construct a router instance.
const router = express.Router();
const { authenticateUser } = require("../middleware/auth-user");
const Courses = require('../models').Courses;
const Users = require('../models').Users;
const asyncHandler = require('../middleware/asyncHandler')
/***
 * ---------------- COURSES ROUTES -----------------------
 */

/***
 * return a list of all courses including the User that owns 
 * each course and a 200 HTTP status code
 */
 router.get('/courses', asyncHandler(async (req, res) => {
    const course = await Courses.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "estimatedTime",
        "materialsNeeded",
      ],
      include: [
        {
          model: Users,
          attributes: ["id", "firstName", "lastName", "emailAddress"],
        }
      ]
    });

    if(course) {
      res.status(200).json(course)
    } else {
      res.status(404).json({ message: "Course not found" })
    }
}))

/***
 * return the corresponding course along with the User that owns that 
 * course and a 200 HTTP status code
 */
router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Courses.findAll({
    attributes: [
        "id",
        "title",
        "description",
        "estimatedTime",
        "materialsNeeded",
    ],
    include: 
      {
        model: Users,
        attributes: ["id", "firstName", "lastName", "emailAddress"],
      },
      where: {
          id: req.params.id
      }
    
  });
  
  if(course) {
    res.status(200).json({ course })
  } else {
    res.status(404).json({ message: "Course not found" })
  }
}));


/***
 * will create a new course, set the Location header to the URI for the 
 * newly created course, and return a 201 HTTP status code and no content
 */
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
  try{
    const user = req.currentUser;
    
    req.body.userId = user.id;
    
    const course = await Courses.create(req.body);
    res.location(`api/courses/${course.id}`);
    res.status(201).end()
  } catch(error){
    console.error(`Error: ${error.name}`);
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
  }
}));

/***
 * will update the corresponding course and return a 204 HTTP status 
 * code
 */
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    
    const course = await Courses.findByPk(req.params.id);
    if(course) {
        if(course.userId === user.id) {
            await course.update(req.body)
            res.status(204).end();
        } else {
            res.status(403).json({ message: "Sorry you cant update this course" })
        }
    }
}));


/***
 * delete the corresponding course and return a 204 HTTP status code 
 */
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Courses.findByPk(req.params.id);
    const user = req.currentUser;
     if(course) {
        if(course.userId === user.id) {
            await course.destroy()
            res.status(204).end();
        } else {
            res.status(403).json({ message: "You cant delete this course!" })
        }
     } else {
         res.status(404).json({ message: "Soory but the course not found" })
     }
    
}))



module.exports = router;