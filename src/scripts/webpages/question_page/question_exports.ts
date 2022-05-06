import { showMessage } from "../../common/common_functions"
import {Answer} from "../../common/content"
import {User} from "../../common/user"

export function confirmButton(){
    let answers = document.querySelectorAll("div[data-testid = 'moderation_box_answer'] > div");

    let button = /*html*/`
    <button title="confirm"  class="sg-button sg-button--s sg-button--solid"><span class="sg-button__icon sg-button__icon--s">
        <div class="sg-icon sg-icon--icon-white sg-icon--x16">
            <svg class="sg-icon__svg" role="img" aria-labelledby="title-star-e7dj7r" focusable="false"><text id="title-star-e7dj7r" hidden="">star</text><use xlink:href="#icon-star_outlined" aria-hidden="true"></use></svg>
        </div>
        </span>
            <span class="sg-button__text">confirm</span>
    </button>
    `
    
    for (let i = 0; i < answers.length; i++) {
      answers[i].insertAdjacentHTML("afterbegin", `<div id=confirm${i}>`+button+`</div>`) //set the id of the confirm button to confirm0 or confirm1 for click events later
      document.getElementById("confirm"+i).addEventListener("click",function(){
        let answerIDs = JSON.parse(document.querySelector("#question-sg-layout-container > div.brn-qpage-layout.js-main-container.js-ads-screening-content > div.brn-qpage-layout__main.empty\\:sg-space-y-m.md\\:empty\\:sg-space-y-l > article").getAttribute("data-z"))
        let ID = answerIDs["responses"][i]["id"]
        let thisans = new Answer()
        thisans.Confirm(ID)
      })
    }
}
export async function removeAnswer(id){
  let resp = await fetch("https://th-extension.lukeg294.repl.co/answers/"+id,{method: "DELETE"})
  .then(response => response.json())
  if (resp.code){
    showMessage("Could not delete: "+resp.message, "error")
  } else {
    showMessage("Cancelled the request for verification.")
  }
}

export async function requestApproval(){
  let answers = document.querySelectorAll("div[data-testid = 'moderation_box_answer'] > div")
  let responses = JSON.parse(document.querySelector("[data-testid='question_box']").getAttribute("data-z")).responses
    for (let i = 0; i < answers.length; i++) {
     if (!responses[i].approved.date){
       let answer = responses[i].id
       let resp = await fetch("https://TH-Extension.lukeg294.repl.co/get_answer_by_id/"+answer).then(response => response.json())
      //if cannot find previous request then add new button
       if (!resp.data){
       
            answers[i].insertAdjacentHTML("beforeend",`<button class="sg-button sg-button--m sg-button--solid-mint  request-verification"> <div class="spinner-container">
            <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
        </div><span class="sg-button__icon sg-button__icon--m">
            <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart_outlined-pld9rg" focusable="false"><text id="title-heart_outlined-pld9rg" hidden="">heart outlined</text>
                <use xlink:href="#icon-check" aria-hidden="true"></use>
              </svg></div>
          </span><span class="sg-button__text">Request Verification</span></button>`)
          let requestButtons = document.querySelectorAll(".request-verification")
    
         
            const element = requestButtons[i];
            
            element.addEventListener("click", async function(){
              document.querySelector(".request-verification .spinner-container").classList.add("show");
              let thisResponse = responses[i]
            
              let databaseId = thisResponse.id
              let answerPreview = thisResponse.content
              let qinfo = JSON.parse(document.querySelector("article").getAttribute("data-z"))
              //@ts-ignore
              let requesterID = JSON.parse(document.querySelector("meta[name='user_data']").content).id
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              let usr = new User()
              let user = await usr.Data(thisResponse.userId)
              console.log(user)
              var raw = JSON.stringify({
                "settings": thisResponse,
                "answerDBid":databaseId,
                "content":answerPreview,
                "qid": qinfo.id,
                "subject":document.querySelector("a[data-testid = 'question_box_subject']").innerHTML,
                "user": user,
                "requesterId":requesterID
                
              });
            
              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw
            
              };

                let serverResponse = await fetch("https://th-extension.lukeg294.repl.co/request-verify-add", requestOptions).then(response => response.json())
              
                //@ts-ignore
                
                if (!serverResponse.message){
                  showMessage("The answer has been added to the verification queue.","success")
                  document.querySelector(".request-verification .spinner-container").classList.remove("show");
                } else {
                  showMessage("There was an error adding to the verification queue: "+serverResponse.message,"error")
                }
                
            })
            
          
          //else - add already requested button
        //@ts-ignore
       } else if (resp.data.requesterId === String(JSON.parse(document.querySelector("meta[name='user_data']").content).id)){

        answers[i].insertAdjacentHTML("beforeend",` <div class="sg-flex sg-flex--column"><button style="margin-bottom:12px;" id="${resp.ref["@ref"].id}" class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach cancel-request">
        <div class="spinner-container">
            <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
        <span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart-215qb" focusable="false"><text id="title-heart-215qb" hidden="">heart</text>
           
        <use xlink:href="#icon-close" aria-hidden="true"></use>
          </svg></div>
      </span><span class="sg-button__text">Cancel Verification</span></button></div>`)
        document.querySelector(".cancel-request").addEventListener("click", async function(){
          document.querySelector(".cancel-request .spinner-container").classList.add("show");
          await removeAnswer(this.id)
          document.querySelector(".cancel-request .spinner-container").classList.remove("show");
        })

       } else {
        answers[i].insertAdjacentHTML("beforeend",` <div class="sg-flex sg-flex--column"><button style="margin-bottom:12px; opacity:0.6; pointer-events: none;" class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-blue"><span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart-215qb" focusable="false"><text id="title-heart-215qb" hidden="">heart</text>
            <use xlink:href="#icon-counter" aria-hidden="true"></use>
          </svg></div>
      </span><span class="sg-button__text">Verification Requested</span></button></div>`)
       }
      
     
     }
    
    }

    
}

