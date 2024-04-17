const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/api/questions', questionController.submitQuestion);

module.exports = router;