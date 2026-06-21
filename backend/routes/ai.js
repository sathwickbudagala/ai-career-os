const express = require('express');
const Groq = require('groq-sdk');
const auth = require('../middleware/auth');

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// AI Career Advice
router.post('/advice', auth, async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert career coach and advisor. 
          You help students and job seekers with career advice, 
          interview preparation, resume tips, and job search strategies.
          Keep responses concise, practical and encouraging.
          Format your response in clear points when listing things.`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
    });

    const response = completion.choices[0].message.content;
    res.json({ response });

  } catch (error) {
    res.status(500).json({ message: 'AI error', error: error.message });
  }
});

// AI Interview Prep
router.post('/interview-prep', auth, async (req, res) => {
  try {
    const { role, company } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert interview coach. 
          Give practical, specific interview preparation advice.
          Include likely questions and how to answer them.`,
        },
        {
          role: 'user',
          content: `Help me prepare for a ${role} interview at ${company}. 
          Give me the top 5 likely questions and how to answer them.`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
    });

    const response = completion.choices[0].message.content;
    res.json({ response });

  } catch (error) {
    res.status(500).json({ message: 'AI error', error: error.message });
  }
});

// AI Resume Tips
router.post('/resume-tips', auth, async (req, res) => {
  try {
    const { resumeText } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert resume reviewer. 
          Give specific, actionable feedback to improve resumes.
          Focus on ATS optimization, clarity and impact.`,
        },
        {
          role: 'user',
          content: `Review this resume and give me specific improvement tips:\n\n${resumeText}`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
    });

    const response = completion.choices[0].message.content;
    res.json({ response });

  } catch (error) {
    res.status(500).json({ message: 'AI error', error: error.message });
  }
});

module.exports = router;