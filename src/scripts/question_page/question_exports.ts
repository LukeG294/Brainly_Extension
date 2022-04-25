import {confirm_answer} from "../common/mod_functions"
import {confirm_button} from "../common/confirm_button"

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