require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Gemini AI
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);


// Test page
app.get("/", (req,res)=>{
  res.send("N-Cut AI V2 Server Running 🚀");
});


// Gemini prompt enhancer
app.post("/enhance-prompt", async(req,res)=>{

  try{

    const { prompt } = req.body;

    if(!prompt){
      return res.json({
        success:false,
        error:"Tsy misy prompt"
      });
    }


    const model = genAI.getGenerativeModel({
      model:"gemini-1.5-flash"
    });


    const result = await model.generateContent(
`
Hanatsara ity prompt ity ho an'ny AI video generator.

Ataovy cinematic, realistic, professional.

Prompt:
${prompt}
`
    );


    const text = result.response.text();


    res.json({
      success:true,
      prompt:text
    });


  }catch(error){

    console.log(error.message);

    res.json({
      success:false,
      error:error.message
    });

  }

});



app.listen(3000,()=>{
 console.log(
 "N-Cut AI V2 Server Running on port 3000"
 );
});
