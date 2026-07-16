require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Test page
app.get("/", (req, res) => {
  res.send("N-Cut AI V2 Server Running 🚀");
});

// Gemini Prompt Enhancer
app.post("/enhance-prompt", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({
        success: false,
        error: "Tsy misy prompt"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite"
    });

    const result = await model.generateContent(`
You are a professional AI prompt engineer.

Rewrite the user's prompt into ONE professional cinematic AI video prompt.

Rules:
- Return ONLY the final prompt.
- Do not add explanations.
- Do not add titles.
- Do not add tips.
- Make it ready for AI video generation.

Requirements:
- Realistic
- Cinematic
- High quality
- Natural lighting
- Smooth camera movement
- Ultra detailed
- Professional camera language
- Keep the original meaning.

Prompt:
${prompt}
`);

    const text = result.response.text();

    res.json({
      success: true,
      prompt: text
    });

  } catch (error) {

    console.log("Gemini Error:", error);

    res.json({
      success: false,
      error: error.message
    });

  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`N-Cut AI V2 Server Running on port ${PORT}`);
});
