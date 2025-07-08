const {GoogleGenerativeAI} = require('@google/generative-ai');
const geminiApiKey = process.env.GEMINI_API_KEY;

const googleAI = new GoogleGenerativeAI(geminiApiKey);

const geminiConfig = {
  temperature: 0.5,
  maxOutputTokens: 1024,
  topP: 0.8,
  topK: 40,
};

const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-2.5-pro',
  ...geminiConfig,
});

const generatePrompt = async (request, response, next) => {
  try {
    const {makanan} = request.body;
    if (!makanan || makanan.length === 0) {
      response.status(400).json({
        code: 400,
        success: false,
        message: 'Makanan is required',
      });
      return;
    }

    const prompt = `Saya ingin membuat sebuah resep untuk ${makanan}.
    Mohon berikan saya langkah-langkah yang jelas dan detail untuk membuatnya.
    Sertakan juga tips atau variasi yang bisa saya coba.
    Saya ingin anda membuat resep tersebut dalam bentuk sebuah blog post yang menarik dan mudah dipahami.
    Saya ingin anda memberikan penjelasannya langsung to the point tanpa menggunakan kata-kata pembuka seperti tentu saja, tentu, dan lainnya.`;
    const result = await geminiModel.generateContent(prompt);
    const responseModel = result.response;
    if (!responseModel) {
      response.status(500).json({
        code: 500,
        success: false,
        message: 'Failed to generate content',
      });
      return;
    } else {
      response.status(200).json({
        code: 200,
        success: true,
        message: 'Content generated successfully',
        data: responseModel.text().replace(/\s+/g, ' ').trim(),
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = generatePrompt;
