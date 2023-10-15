import {
  extension_server_url
 
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
export async function withdrawReport(id){
  chrome.runtime.sendMessage({ message:"cancel_verify", data: {"id":id}}, function () {});
}
export async function log_action(args){
  chrome.runtime.sendMessage({ message:"log_user_action", data: args}, function () {});
}
export function cancel_html(){
  return `<div class = "sg-flex sg-flex--margin-left-xxs">
  <button class="cancel-request queueButtons sg-button sg-button--m sg-button--solid-mint">
  <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
    <span class="sg-button__icon sg-button__icon--m">
      <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">filter filled</text>
          <use xlink:href="#icon-counter" aria-hidden="true"></use>
        </svg></div>
  </button>
  </div>`
}
export function already_requested_html(i){
  return `<div class = "sg-flex sg-flex--margin-left-xxs">
  <button id="requested-${i}" class="is-requested queueButtons sg-button sg-button--m sg-button--solid-mint">
  <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
    <span class="sg-button__icon sg-button__icon--m">
      <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">filter filled</text>
          <use xlink:href="#icon-counter" aria-hidden="true"></use>
        </svg></div>
  </button>
  </div>`
}
export function already_rejected_html(i){
  return `<div class = "sg-flex sg-flex--margin-left-xxs">
  <button id="rejected-${i}" class="is-rejected queueButtons sg-button sg-button--m sg-button--solid-mint">
  <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
    <span class="sg-button__icon sg-button__icon--m">
      <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" style="fill: #ff7968 !important;" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">filter filled</text>
          <use xlink:href="#icon-block" aria-hidden="true"></use>
        </svg></div>
  </button>
  </div>`
}
export function to_request_html(){
  return ` <div class = "sg-flex sg-flex--margin-left-xxs">
  <button class="request-verification queueButtons sg-button sg-button--m sg-button--solid-mint">
  <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
    <span class="sg-button__icon sg-button__icon--m">
      <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">filter filled</text>
          <use xlink:href="#icon-check" aria-hidden="true"></use>
        </svg></div>
  </button>
  </div>`
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
          let resp = await fetch(`${extension_server_url()}/verification/get_answer/` + answer).then(data => data.json());
          let past_approvals = await fetch(`${extension_server_url()}/verification/logs/${answer}`).then(data => data.json());
          //@ts-ignore
          if (!resp.content && !past_approvals.requester) {  
              let beingAnswered = document.querySelector(".brn-qpage-next-answer-box")
              let trueI = i
              if (answers.length === 1 && !beingAnswered) {
                if (areaToAppend[i].parentElement.getAttribute("data-testid") !== 'question_box_options_list'){
                  areaToAppend[i].insertAdjacentHTML("afterbegin", /*html*/ to_request_html())
                }
              } else if (beingAnswered) {
                if (areaToAppend[i+1].parentElement.getAttribute("data-testid") !== 'question_box_options_list'){
                  areaToAppend[i+1].insertAdjacentHTML("afterbegin", /*html*/ to_request_html())
                }
               trueI += 1
              } else {
                if (areaToAppend[i+1].parentElement.getAttribute("data-testid") !== 'question_box_options_list'){
                  areaToAppend[i+1].insertAdjacentHTML("afterbegin", /*html*/ to_request_html())
                }
                trueI += 1
              }
              let element = document.querySelectorAll(".queueButtons")[i]
              if (!element.classList.contains('inserted')) {
                element.addEventListener("click", async function() {
                  let thisResponse = responsesData[i]
                  let databaseId = thisResponse.id
                  let answerPreview = thisResponse.content
                  let qinfo = JSON.parse(document.querySelector("article").getAttribute("data-z"))
                      //@ts-ignore
                  let requesterID = JSON.parse(document.querySelector("meta[name='user_data']").content).id
                      //@ts-ignore
                  let requesterAv = JSON.parse(document.querySelector("meta[name='user_data']").content).avatar
                      //@ts-expect-error
                  let requesterName = JSON.parse(document.querySelector("meta[name='user_data']").content).nick
                  let user = await User.Data(thisResponse.userId)
                  chrome.runtime.sendMessage({ message:"add_verify", data: {id:answer, object:{"answerDBid": databaseId, "settings":thisResponse, content: answerPreview, "qid": qinfo.id, "subject":d_reference.data.subjects.find(({id}) => id === qinfo.subject_id).icon, "user": user, "requesterId": requesterID, "requesterName": requesterName,"requesterAv": requesterAv}}}, function () {});
                  //@ts-ignore
                  Notify.Flash("The answer has been requested to be verified.", "success")
                  element.classList.remove("show");
                  element.remove();
                  element.classList.add('inserted')
                })
            }
            //@ts-ignore
          } else if (String(resp.requesterId) === String(JSON.parse(document.querySelector("meta[name='user_data']").content).id)) {
            let beingAnswered = document.querySelector(".brn-qpage-next-answer-box")
            //@ts-ignore
            if (answers.length === 1 && !beingAnswered) {
              areaToAppend[i].insertAdjacentHTML("afterbegin", /*html*/ cancel_html())
            } else if (beingAnswered) {
              areaToAppend[i+1].insertAdjacentHTML("afterbegin", /*html*/ cancel_html())
            } else {
              areaToAppend[i+1].insertAdjacentHTML("afterbegin", /*html*/ cancel_html())
            }
            document.querySelectorAll(".cancel-request")[i].addEventListener("click",function(){
              Notify.Dialog("Under Review", `This item was requested to be approved by you and is in the queue. Withdraw this request by clicking proceed.`, withdrawReport, true, responsesData[i].id, this)
            });
           
          } else if (past_approvals.requester){
            let beingAnswered = document.querySelector(".brn-qpage-next-answer-box")
            let trueI = i
            //@ts-ignore
            if (answers.length === 1 && !beingAnswered) {
              areaToAppend[i].insertAdjacentHTML("afterbegin", /*html*/ already_rejected_html(i))
            } else if (beingAnswered){
              areaToAppend[i+1].insertAdjacentHTML("afterbegin", /*html*/ already_rejected_html(i))
              trueI += 1
            } else {
              areaToAppend[i+1].insertAdjacentHTML("afterbegin", /*html*/ already_rejected_html(i))
              trueI += 1
            }
            
            document.getElementById(`rejected-${i}`).addEventListener("click",function(){
              Notify.Dialog("Already Rejected", `This item was requested to be approved by ${past_approvals.requester.name} and was rejected by ${past_approvals.handler.name}.`, false, false)
            });
           } else {
            let beingAnswered = document.querySelector(".brn-qpage-next-answer-box")
            let trueI = i
            //@ts-ignore
            if (answers.length === 1 && !beingAnswered) {
              areaToAppend[i].insertAdjacentHTML("afterbegin", /*html*/ already_requested_html(i))
            } else if (beingAnswered){
              trueI+=1
              areaToAppend[i+1].insertAdjacentHTML("afterbegin", /*html*/ already_requested_html(i))
            } else {
              trueI+=1
              areaToAppend[i+1].insertAdjacentHTML("afterbegin", /*html*/ already_requested_html(i))
            }
            document.getElementById(`requested-${i}`).addEventListener("click",function(){
              Notify.Dialog("Under Review", `This item was requested by ${resp.requesterName} and is in the queue.`, false, false)
            });

          }
          


      } else {

      }

  }


  }