const OpenAI = require("openai");
const Question = require("../models/Question");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

async function getAnswer(question) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'user', content: `Give Answer of this question: ${question} and Remember the History of Conversation` },
    ],
    model: "gpt-3.5-turbo",
  });

  return chatCompletion.choices[0].message.content;
}

async function submitQuestion(req, res) {
  try {
    const { question } = req.body;
    const answer = await getAnswer(question);

    const newQuestion = new Question({
      question,
      answer,
    });
    await newQuestion.save();

    res.json({ answer });
  } catch (error) {
    console.error("Error processing question:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getAnswerFromDatabase = async (req, res) => {
  try {
    const { question } = req.body;
    const result = await Question.findOne({ question });

    if (!result) {
      res.status(404).json({ error: "Answer not found" });
      return;
    }
    const answer = result.answer;
    res.json({ answer });
  } catch (error) {
    console.error("Error fetching Answer from database:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSuggestions = async (req, res) => {
  const { question } = req.body;
  try {
    // Retrieve existing questions from the database
    const existingQuestions = await Question.find({}, "question");

    // Filter suggestions based on similarities with existing questions
    const suggestions = existingQuestions
      .map((existingQuestion) => existingQuestion.question)
      .filter((existingQuestion) =>
        existingQuestion.toLowerCase().includes(question.toLowerCase())
      );

    res.json({ suggestions });
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  submitQuestion,
  getAnswerFromDatabase,
  getSuggestions,
};
