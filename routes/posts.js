const express = require('express');
const router = express.Router(); // It is creating an instance of an Express router.

const postcontroller = require('../controllers/posts_controller');

router.get('/', postcontroller.post);

module.exports = router; 

