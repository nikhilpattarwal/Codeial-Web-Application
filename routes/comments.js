const express = require('express');
const router = express.Router(); // It is creating an instance of an Express router.

const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);

module.exports = router; 

