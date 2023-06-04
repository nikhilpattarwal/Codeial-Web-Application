const express = require('express');
const router = express.Router();  //used to create a route handler

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

console.log('router loaded');

module.exports = router;