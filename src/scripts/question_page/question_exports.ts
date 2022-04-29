import {confirm_answer} from "../common/mod_functions"
import { showMessage } from "../common/common_functions"

export function confirm_button(){
  return(/*html*/`
  <button title="confirm"  class="sg-button sg-button--s sg-button--solid"><span class="sg-button__icon sg-button__icon--s">
      <div class="sg-icon sg-icon--icon-white sg-icon--x16">
          <svg class="sg-icon__svg" role="img" aria-labelledby="title-star-e7dj7r" focusable="false"><text id="title-star-e7dj7r" hidden="">star</text><use xlink:href="#icon-star_outlined" aria-hidden="true"></use></svg>
      </div>
      </span>
          <span class="sg-button__text">confirm</span>
  </button>
  `)
}

export function confirmButton(){
    function ConfirmButtonListener(number){
      document.getElementById("confirm"+number).addEventListener("click",function(){
        let answerIDs = JSON.parse(document.querySelector("#question-sg-layout-container > div.brn-qpage-layout.js-main-container.js-ads-screening-content > div.brn-qpage-layout__main.empty\\:sg-space-y-m.md\\:empty\\:sg-space-y-l > article").getAttribute("data-z"))
        let answerToConfirm = answerIDs["responses"][number]["id"]
        confirm_answer(answerToConfirm)
      })
    }
    
    let answers = document.querySelectorAll("div[data-testid = 'moderation_box_answer'] > div")
       
    for (let i = 0; i < answers.length; i++) {
      answers[i].insertAdjacentHTML("afterbegin", `<div id=confirm${i}>`+confirm_button()+`</div>`) //set the id of the confirm button to confirm0 or confirm1 for click events later
      ConfirmButtonListener(i) //add the event listener to the button
    }
  }



export function requestApproval(){
  let answers = document.querySelectorAll(".AnswerBoxHeader-module__header--2JjZN")
       
    for (let i = 0; i < answers.length; i++) {
      answers[i].insertAdjacentHTML("beforeend",`<button class="sg-button sg-button--m sg-button--solid-mint  request-verification"> <div class="spinner-container">
      <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
  </div><span class="sg-button__icon sg-button__icon--m">
      <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart_outlined-pld9rg" focusable="false"><text id="title-heart_outlined-pld9rg" hidden="">heart outlined</text>
          <use xlink:href="#icon-check" aria-hidden="true"></use>
        </svg></div>
    </span><span class="sg-button__text">Request Verification</span></button>`)
    }

    let requestButtons = document.querySelectorAll(".request-verification")
    let responses = JSON.parse(document.querySelector("[data-testid='question_box']").getAttribute("data-z")).responses
    for (let index = 0; index < requestButtons.length; index++) {
      const element = requestButtons[index];
      
      element.addEventListener("click", async function(){
        document.querySelector(".request-verification .spinner-container").classList.add("show");
        let thisResponse = responses[index]
       
        let userID = thisResponse.userId
        let isReported = thisResponse.settings.canMarkAbuse
        if (isReported){
          isReported = false 
        } else {
          isReported = true
        }
       
        let databaseId = thisResponse.id
        let answerPreview = thisResponse.content
        
        //@ts-ignore
        let requesterID = JSON.parse(document.querySelector("meta[name='user_data']").content).id
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "userRequester": requesterID,
          "isReported": isReported,
          "userAnswererId": userID,
          "answerDBid":databaseId,
          "answerPreview":answerPreview
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
       
        };

          let serverResponse = await fetch("https://th-extension.lukeg294.repl.co/request-verify-add", requestOptions).then(response => response.json())
         
          //@ts-ignore
          console.log(serverResponse)
          if (serverResponse){
            showMessage("The answer has been added to the verification queue.","success")
            document.querySelector(".request-verification .spinner-container").classList.remove("show");
          } else {
            showMessage("There was an error adding to the verification queue.","error")
          }
          
      })
      
    }
  
}

