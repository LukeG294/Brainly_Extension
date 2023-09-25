import {
  extension_server_url,
  pageElement,
  pageElementAll
} from "configs/config";
import Notify from "../../common/Notifications/Notify"
import User from "../../common/User"
import Extension from "../../../locales/en/localization.json"
import {
  insert_ticket
} from "../../common/ModFunctions";
import {
  Answer,
  Question
} from "../../common/Content"
import {
  parseProfileLink,
  parseQuestionLink
} from "configs/config"
import BrainlyAPI from "../../../scripts/common/BrainlyAPI"


export async function removeAnswer(id, type: string) {
  if (type === 'verification') {
      let resp = await fetch(`${extension_server_url()}/answers/` + id, {
              method: "DELETE"
          })
          .then(response => response.json())
      if (resp.code) {
          Notify.Flash("Could not delete: " + resp.message, "error")
      } else {
          Notify.Flash("Cancelled the request for verification.", "error")
      }
  } else if (type === 'unverification') {

      let resp = await fetch(`${extension_server_url()}/answers-unverify/` + id, {
              method: "DELETE"
          })
          .then(response => response.json())
      if (resp.code) {
          Notify.Flash("Could not delete: " + resp.message, "error")
      } else {
          Notify.Flash("Cancelled the request for unverification.", "error")
      }
  }
}
export async function confirmButton() {
  let oldTickets = document.querySelectorAll('[data-testid="moderation_box_answer"]')

  for (var i = 0; i < oldTickets.length; i++) {

      oldTickets[i].children[0].children[0].insertAdjacentHTML("afterend", /*html*/ `
    <div>
    <button class="sg-button sg-button--m sg-button--solid confirm-black">
      <span class="sg-button__icon sg-button__icon--m"><div class="sg-icon sg-icon--adaptive sg-icon--x24">
        <svg class="sg-icon__svg" role="img" aria-labelledby="title-heart_outlined-hyr1vi" focusable="false">
          <text id="title-heart_outlined-hyr1vi" visibility="hidden">heart outlined</text>
          <use xlink:href="#icon-thumb_up_outlined" aria-hidden="true"></use>
        </svg></div>
      </span>
      <span class="sg-button__text">confirm</span></button>
      </div>
    `)



  }
  let confirmButtons = document.querySelectorAll('.confirm-black')

  for (let i = 0; i < confirmButtons.length; i++) {
      let element = confirmButtons[i]
      if (!element.classList.contains('alrdone')) {
          element.addEventListener("click", async function() {
              let ansObj = new Answer();
              let id = parseInt(parseQuestionLink(window.location.href))
              let qData = await BrainlyAPI.GetQuestion(id)
              let resp = qData["data"]["responses"][i]
              console.log(resp)
              if (resp["settings"]["is_marked_abuse"] === true) {
                  ansObj.Confirm(resp["id"])
                  
                  //@ts-ignore
                  await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/moderate_tickets/expire`,{method: "POST", body:`{"model_id":${qData.data.task.id},"model_type_id":1,"schema":"moderation.ticket.expire"}`})
                  Notify.Flash(`Confirmed`, "success");
              } else {
                  Notify.Flash(`Nothing to confirm`, "info");
              }
              element.classList.add('alrdone')
          })
      }
  }

}
export async function newTickets() {
  let oldTickets = document.querySelectorAll('[data-testid="options_list"]')
  oldTickets.forEach(element => {
      element.insertAdjacentHTML("afterbegin", /*html*/ `
  <div class = "sg-flex sg-flex--margin-left-xxs">
  <button class="openTicketQuestionPage">
  <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
    <span class="sg-button__icon sg-button__icon--m">
      <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">filter filled</text>
          <use xlink:href="#icon-shield" aria-hidden="true"></use>
        </svg></div>
  </button>
  </div>
  `)
  });
  let id = window.location.href.split('/')[4].split("?")[0]
  let openTicketButtons = document.querySelectorAll('.openTicketQuestionPage')
  openTicketButtons.forEach(element => {
      if (!element.classList.contains('inserted')) {
          element.addEventListener("click", function() {
              if (!document.querySelector('.modal')) {}
              insert_ticket(id, element.querySelector('.spinner-container'))
              element.classList.add('inserted')
          })
      }
  });
}
export async function requestApproval() {
  let responsesData = JSON.parse(document.querySelector("[data-testid='question_box']").getAttribute("data-z")).responses
  let d_reference = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/api_config/desktop_view`, {
      method: "GET"
  }).then(data => data.json());
  let areaToAppend = document.querySelectorAll('[data-testid="options_list"]')
  let answers = document.querySelectorAll("div[data-testid = 'answer_box_options_list']")
  let responses = JSON.parse(document.querySelector("[data-testid='question_box']").getAttribute("data-z")).responses
  for (let i = 0; i < answers.length; i++) {
      if (true) {
          let answer = responses[i].id
          let resp = await fetch(`${extension_server_url()}/get_answer_by_id/` + answer).then(response => response.json())
          if (!resp.data) {
            if (answers.length > 1 && !document.querySelectorAll(".request-verification")[i]){
              areaToAppend[i+1].insertAdjacentHTML("afterbegin", /*html*/ `
              <div class = "sg-flex sg-flex--margin-left-xxs">
              <button class="request-verification queueButtons sg-button sg-button--m sg-button--solid-mint">
              <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                <span class="sg-button__icon sg-button__icon--m">
                  <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">filter filled</text>
                      <use xlink:href="#icon-check" aria-hidden="true"></use>
                    </svg></div>
              </button>
              </div>
              `)
            } else if (!document.querySelectorAll(".queueButtons")[i+1]) {
              areaToAppend[i].insertAdjacentHTML("afterbegin", /*html*/ `
              <div class = "sg-flex sg-flex--margin-left-xxs">
              <button class="request-verification queueButtons sg-button sg-button--m sg-button--solid-mint">
              <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                <span class="sg-button__icon sg-button__icon--m">
                  <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">filter filled</text>
                      <use xlink:href="#icon-check" aria-hidden="true"></use>
                    </svg></div>
              </button>
              </div>
              `)
            }
             
              let element = document.querySelectorAll(".queueButtons")[i]
              if (!element.classList.contains('inserted')) {
                element.addEventListener("click", async function() {
                  let thisResponse = responsesData[i]
                  let databaseId = thisResponse.id
                  let answerPreview = thisResponse.content
                  let qinfo = JSON.parse(pageElement("article").getAttribute("data-z"))
                      //@ts-ignore
                  let requesterID = JSON.parse(pageElement("meta[name='user_data']").content).id
                      //@ts-ignore
                  let requesterAv = JSON.parse(pageElement("meta[name='user_data']").content).avatar
                      //@ts-expect-error
                  let requesterName = JSON.parse(pageElement("meta[name='user_data']").content).nick
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  let user = await User.Data(thisResponse.userId)
                  var raw = JSON.stringify({
                      "settings": thisResponse,
                      "answerDBid": databaseId,
                      "content": answerPreview,
                      "qid": qinfo.id,
                      "subject": d_reference.data.subjects.find(({
                          id
                      }) => id === qinfo.subject_id).icon,
                      "user": user,
                      "requesterId": requesterID,
                      "requesterName": requesterName,
                      "requesterAv": requesterAv
                  });
                  var requestOptions = {
                      method: 'POST',
                      headers: myHeaders,
                      body: raw
          
                  };
          
                  let serverResponse = await fetch(`${extension_server_url()}/request-verify-add`, requestOptions).then(response => response.json())
                  //@ts-ignore
                  if (!serverResponse.message) {
                      Notify.Flash("The answer has been added to the verification queue.", "success")
                      pageElement(".request-verification .spinner-container").classList.remove("show");
                      pageElement(".request-verification").remove();
                    
          
                  } else {
                      Notify.Flash(Extension.common.verificationQueueError + serverResponse.message, "error")
                  }
                    element.classList.add('inserted')
                })
            }
            //@ts-ignore
          } else if (resp.data.requesterId === String(JSON.parse(document.querySelector("meta[name='user_data']").content).id)) {
            
            let answer = responses[i].id
            let resp = await fetch(`${extension_server_url()}/get_answer_by_id/` + answer).then(response => response.json())
            console.log(areaToAppend)
            if (answers.length > 1){
              areaToAppend[i + 1].insertAdjacentHTML("afterbegin", /*html*/ `
              <div class = "sg-flex sg-flex--margin-left-xxs">
              <button class="cancel-request queueButtons sg-button sg-button--m sg-button--solid-mint" id=${resp["ref"]["@ref"]["id"]}>
              <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                <span class="sg-button__icon sg-button__icon--m">
                  <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">filter filled</text>
                      <use xlink:href="#icon-block" aria-hidden="true"></use>
                    </svg></div>
              </button>
              </div>
              `)
            } else if (!document.querySelectorAll(".queueButtons")[i]) {
              
              areaToAppend[i].insertAdjacentHTML("afterbegin", /*html*/ `
              <div class = "sg-flex sg-flex--margin-left-xxs">
              <button class="cancel-request queueButtons sg-button sg-button--m sg-button--solid-mint" id=${resp["ref"]["@ref"]["id"]}>
              <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                <span class="sg-button__icon sg-button__icon--m">
                  <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">filter filled</text>
                      <use xlink:href="#icon-block" aria-hidden="true"></use>
                    </svg></div>
              </button>
              </div>
              `)
            }
            
          
           document.querySelectorAll(".queueButtons")[i].addEventListener("click", async function(){
          
            await removeAnswer(this.id, 'verification')
            this.remove();
            
           })
                 

            

          } else {
              //insert clock icon

          }


      } else {

      }

  }


  }