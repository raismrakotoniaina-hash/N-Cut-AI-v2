alert("Script Loaded!");
const button = document.getElementById("enhancePrompt");
const result = document.getElementById("result");
const promptBox = document.getElementById("prompt");


button.onclick = async ()=>{


    const prompt = promptBox.value;


    if(!prompt){

        result.innerText =
        "Soraty aloha ny hevitrao.";

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


            result.innerText =
            data.prompt;


        }else{


            result.innerText =
            "❌ "+data.error;


        }



    }catch(error){


        result.innerText =
        "❌ Olana: "+error.message;


    }


};
