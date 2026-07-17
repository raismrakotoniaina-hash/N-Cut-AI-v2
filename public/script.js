alert("Script Loaded!");


// =====================
// GEMINI ENHANCE PROMPT
// =====================

const button = document.getElementById("enhancePrompt");
const result = document.getElementById("result");
const promptBox = document.getElementById("prompt");


if(button){

button.onclick = async ()=>{

    const prompt = promptBox.value;

    if(!prompt){
        result.innerText = "Soraty aloha ny hevitrao.";
        return;
    }

    result.innerText =
    "🤖 Gemini manatsara prompt...";


    try{

        const response = await fetch("/enhance-prompt",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                prompt:prompt
            })

        });


        const data = await response.json();


        if(data.success){

            result.innerText = data.prompt;

        }else{

            result.innerText =
            "❌ " + data.error;

        }


    }catch(error){

        result.innerText =
        "❌ Olana: " + error.message;

    }

};

}



// =====================
// POLLINATIONS IMAGE GENERATOR
// =====================


const imageButton =
document.getElementById("generateImage");

const imageResult =
document.getElementById("imageResult");


if(imageButton){

imageButton.onclick = async ()=>{


    const prompt = promptBox.value;


    if(!prompt){

        imageResult.innerText =
        "Soraty aloha ny prompt.";

        return;

    }


    imageResult.innerText =
    "🎨 Mamorona sary AI...";


    try{


        const response = await fetch("/generate-image",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },


            body:JSON.stringify({

                prompt:prompt

            })

        });



        const data = await response.json();



        if(data.success){


            imageResult.innerHTML =

            `<img src="${data.image}" width="400">`;


        }else{


            imageResult.innerText =
            "❌ " + data.error;


        }


    }catch(error){


        imageResult.innerText =
        "❌ " + error.message;


    }


};

}
