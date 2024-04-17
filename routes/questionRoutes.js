const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post("/api/questions", questionController.submitQuestion);
router.post("/api/fetch-answer", questionController.getAnswerFromDatabase);

module.exports = router;