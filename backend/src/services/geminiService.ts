const {GoogleGenerativeAI} = require('@google-cloud/generative-ai');

const generativeAI = new GoogleGenerativeAI(process.env.API_KEY);