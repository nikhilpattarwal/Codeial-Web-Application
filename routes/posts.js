const express = require('express');
const router = express.Router(); // It is creating an instance of an Express router.

const postController = require('../controllers/posts_controller');

router.post('/create', postController.create);

module.exports = router; 

