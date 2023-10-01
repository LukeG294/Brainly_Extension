import { extension_server_url } from "configs/config";
import Notify from "../../common/Notifications/Notify"
import Status from "../../common/Notifications/Status"
import {Answer} from "../../common/Content"
import Extension from "../../../locales/en/localization.json"
import Label from "../../common/Notifications/Status";
import { log_action, withdrawReport } from "../questionPage/QuestionExports";


export async function removeAnswer(id, button){
  
  button.classList.add("show");
 
  
  let item = button.parentElement.parentElement.parentElement
  let user = await fetch("https://brainly.com/api/28/api_users/me").then(data => data.json())
  let userData = user.data.user
  let RequesterId = item.querySelector('.user').getAttribute('user-id')
  let RequesterName = item.querySelector('.user').getAttribute('user-nick')
  let HandlerId = userData.id
  let HandlerName = userData.nick
  let HandledTime = new Date()
  let AnswerID = item.getAttribute('datatype')
  let QuestionSubject = item.querySelector('.sg-subject-icon').children[0].href.baseVal.split('-')[2]
  let QuestionLink = item.querySelector('.qid').innerHTML.replace('#','')
  
  withdrawReport(id)
  //1 = rejected
  //0 = accepted
  let RejectApprove = 'rejected'
  let list = {RequesterId, RequesterName, HandlerId, HandlerName, HandledTime, QuestionSubject, QuestionLink, RejectApprove, AnswerID}
  log_action(list)
  
 
  button.classList.remove("show");
  item.style.opacity = '0.5'
  item.style.pointerEvents = 'none'
    
  
    
}

export async function approveAnswer(id, answerId, button){
  
  button.classList.add("show");
  
  let answer = new Answer()
  answer.Approve(answerId)
  let item = button.parentElement.parentElement.parentElement
  button.classList.remove("show");
  item.classList.add("approved");
  let user = await fetch("https://brainly.com/api/28/api_users/me").then(data => data.json())
  let userData = user.data.user
  let RequesterId = item.querySelector('.user').getAttribute('user-id')
  let RequesterName = item.querySelector('.user').getAttribute('user-nick')
  let HandlerId = userData.id
  let HandlerName = userData.nick
  let HandledTime = new Date()
  let AnswerID = item.getAttribute('datatype')
  let QuestionSubject = item.querySelector('.sg-subject-icon').children[0].href.baseVal.split('-')[2]
  let QuestionLink = item.querySelector('.qid').innerHTML.replace('#','')
  
  withdrawReport(id)
  let RejectApprove = 'accepted'
  let list = {RequesterId, RequesterName, HandlerId, HandlerName, HandledTime, QuestionSubject, QuestionLink, RejectApprove, AnswerID}
  log_action(list)
  
  
}


export async function verificationSwitcherHandler(fn){
  await new Promise(f => setTimeout(f, 200))
  let verifyElement = document.querySelector(`a[href="repl-this-verify"]`)
  let unverifyElement = document.querySelector(`a[href="repl-this-unverify"]`)
 
  //@ts-ignore
  verifyElement.removeAttribute("href")
  verifyElement.addEventListener("click", async function(){
    //@ts-expect-error
    document.querySelectorAll('.sg-dropdown')[0].children[0].innerText = verifyElement.innerText

    let verStat = new Label("verfetch")
    verStat.Show("Fetching verification requests", "blue", true, false);
    let toRender = await fetch(`${extension_server_url()}/queue/0`).then(response => response.json())
    verStat.Close();

    fn(toRender);
    await new Promise(f => setTimeout(f, 200))
    document.querySelectorAll('.actions').forEach(element => {
      //@ts-expect-error
      element.style.visibility = 'visible'
    });
    document.querySelectorAll('.item').forEach(element => {
      //@ts-expect-error
      element.style.border = 'none'
    });
    
    
  })
  
  //@ts-ignore
  unverifyElement.removeAttribute("href")
  unverifyElement.addEventListener("click", async function(){
    
    //@ts-expect-error
    document.querySelectorAll('.sg-dropdown')[0].children[0].innerText = unverifyElement.innerText

    let unStat = new Label("unfetch");
    unStat.Show("Fetching unverification requests", "blue", true, false);
   // let toRender = await get_next_page_unverify('0')
    unStat.Close();
    
 //  console.log(toRender)
   // fn(toRender);
    await new Promise(f => setTimeout(f, 100))
    document.querySelectorAll('.actions').forEach(element => {
      //@ts-expect-error
      element.style.visibility = 'hidden'
    });
    document.querySelectorAll('.item').forEach(element => {
      //@ts-expect-error
      element.style.border = '2px solid rgb(156, 232, 194)'
    });
    
  })
  unverifyElement.removeAttribute("href") 
    
}

export async function loadNextPage(){
  //let count = await fetch("https://lgextension.azurewebsites.net/verification/count").then(response => response.json())
   
  //@ts-expect-error
document.querySelector(".pagination").style.opacity = "0.5"
//@ts-expect-error
let currentPageDisplay = parseInt(document.querySelector(".literalNum").innerText)
if (currentPageDisplay >= 0){
    let nextData = await fetch(`${extension_server_url()}/verification/queue/`+(currentPageDisplay))
    .then(response => response.json())
    //@ts-ignore
   
    if (nextData[0]){
      //@ts-ignore
      document.querySelector(".pagenum").innerHTML = `<div class='literalNum'>${parseInt(currentPageDisplay) + 1}</div>`
      
      
    } else {
      //@ts-ignore
      document.querySelector(".pagination").style.opacity = "1"
      return false
    }
     //@ts-ignore
   
    document.querySelector(".pagination").style.opacity = "1"
    return nextData
}
//@ts-expect-error
document.querySelector(".pagination").style.opacity = "1"
}

export async function loadPrevPage(){
  //let count = await fetch("https://lgextension.azurewebsites.net/verification/count").then(response => response.json())
//@ts-expect-error
document.querySelector(".pagination").style.opacity = "0.5"
//@ts-expect-error
let currentPageDisplay = parseInt(document.querySelector(".literalNum").innerText)
if (currentPageDisplay > 1){
    let prevData = await fetch(`${extension_server_url()}/verification/queue/`+(currentPageDisplay-2))
    .then(response => response.json())
    if (prevData[0]){
      //@ts-ignore
      document.querySelector(".pagenum").innerHTML = `<div class='literalNum'>${parseInt(currentPageDisplay) - 1}</div>`
      //@ts-ignore
      
    } else {
      return false
    }
    //@ts-ignore
    document.querySelector(".pagenum").innerHTML = `<div class='literalNum'> ${parseInt(currentPageDisplay) - 1} </div>`
    //@ts-ignore
    document.querySelector(".pagination").style.opacity = "1"
    return prevData
}
//@ts-expect-error
document.querySelector(".pagination").style.opacity = "1"


}

