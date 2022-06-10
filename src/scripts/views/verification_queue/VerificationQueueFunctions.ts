import { extension_server_url } from "configs/config";
import Notify from "../../common/Notifications/Notify"
import Status from "../../common/Notifications/Status"
import {Answer} from "../../common/Content"
import Extension from "../../../locales/en/localization.json"

export async function removeAnswer(id, button){
  
  button.classList.add("show");
  console.log(button)
  let resp = await fetch(`${extension_server_url()}/answers/`+id,{method: "DELETE"})
  .then(response => response.json())
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
  //1 = rejected
  //0 = accepted
  add_verification_record(RequesterId, RequesterName, HandlerId, HandlerName, HandledTime, QuestionSubject, QuestionLink, '1', AnswerID)
  if (!resp.statusCode){
    let item = button.parentElement.parentElement.parentElement
    button.classList.remove("show");
    item.style.opacity = '0.5'
    item.style.pointerEvents = 'none'
    
  } else {
    Notify.Flash(resp.message,"error")
  }
    
}

export async function approveAnswer(id, answerId, button){
  
  button.classList.add("show");
  console.log(button)
  let resp = await fetch(`${extension_server_url()}/answers/`+id,{method: "DELETE"})
  .then(response => response.json())

  if (!resp.statusCode){
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
    add_verification_record(RequesterId, RequesterName, HandlerId, HandlerName, HandledTime, QuestionSubject, QuestionLink, '0', AnswerID)
  } else {
    Notify.Flash(resp.message,"error")
  }
  
}

export async function loadNextPage(){
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "0.5"
  //@ts-expect-error
    let currentPageDisplay = parseInt(document.querySelector(".literalNum").innerText)
    if (currentPageDisplay >= 0){
        let nextData = await fetch(`${extension_server_url()}/get_next_page/`+String(currentPageDisplay))
        .then(response => response.json())
        //@ts-ignore
       
        if (!nextData.end){
          //@ts-ignore
          document.querySelector(".pagenum").innerHTML = `<div class='literalNum'>${parseInt(currentPageDisplay) + 1}&nbsp</div> of ${Math.ceil(parseInt(await getQueueInfo())/12)}`
          //@ts-ignore
          
        } 
         //@ts-ignore
        document.querySelector(".pagination").style.opacity = "1"
        return nextData
    }
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "1"
}

export async function loadPrevPage(){
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "0.5"
    //@ts-expect-error
    let currentPageDisplay = document.querySelector(".literalNum").innerText
    if (parseInt(currentPageDisplay) > 1){
        let prevData = await fetch(`${extension_server_url()}/get_prev_page/`+currentPageDisplay)
        .then(response => response.json())
        if (!prevData.end){
          //@ts-ignore
          document.querySelector(".pagenum").innerHTML = `<div class='literalNum'>${parseInt(currentPageDisplay) - 1}&nbsp</div> of ${Math.ceil(parseInt(await getQueueInfo())/12)}`
          //@ts-ignore
          
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
export async function getQueueInfo(){
  let total = await fetch(`${extension_server_url()}/queue_fetch_info`).then(data => data.json());
  return total.count
}
export async function get_items_by_subject(subject_icon_name){
  let data = await fetch(`${extension_server_url()}/get_data_by_subject/${subject_icon_name}`).then(data => data.json());
  return data
}
export async function get_next_page_unverify(page){
  let data = await fetch(`${extension_server_url()}/get-next-page-unverify/${page}`).then(data => data.json());
  return data
}
export async function subjectFilterHandler(fn){
  
    let d_reference = await fetch(`https://brainly.com/api/28/api_config/desktop_view`, {method: "GET"}).then(data => data.json());
    let subjects = d_reference.data.subjects 
    subjects.forEach( async subject => {
        let element = document.querySelector(`a[href="subject-${subject.icon}"]`)
        if (element){
          element.removeAttribute("href")
          element.addEventListener("click", async function(){
            //@ts-expect-error
            document.querySelector('.sg-dropdown').children[0].innerText = element.innerText
            Status.Show(`Fetching items in ${subject.name}`, "blue", true, false);
            let toRender = await get_items_by_subject(subject.icon)
            document.querySelector(".displayMessage").remove();
            console.log(toRender)
            fn(toRender);
          })
        }
        
    })
    let elm = document.querySelector(`a[href="subject-all"]`)
    if (elm){
      elm.removeAttribute("href")
      elm.addEventListener("click", async function(){
        //@ts-expect-error
        document.querySelector('.sg-dropdown').children[0].innerText = 'SUBJECT'
        Status.Show(`Fetching all items`, "blue", true, false);
        let toRender = await fetch(`${extension_server_url()}/get_next_page/0`)
        .then(response => response.json())
        document.querySelector(".displayMessage").remove();
        fn(toRender);
      })
    }
  
}
export async function verificationSwitcherHandler(fn){
  await new Promise(f => setTimeout(f, 200))
  let verifyElement = document.querySelector(`a[href="repl-this-verify"]`)
  let unverifyElement = document.querySelector(`a[href="repl-this-unverify"]`)
 
  //@ts-ignore
  verifyElement.removeAttribute("href")
  verifyElement.addEventListener("click", async function(){
    //@ts-expect-error
    document.querySelectorAll('.sg-dropdown')[1].children[0].innerText = verifyElement.innerText
    Status.Show("Fetching verification requests", "blue", true, false);
    let toRender = await fetch(`${extension_server_url()}/get_next_page/0`).then(response => response.json())
    document.querySelector(".displayMessage").remove();
    fn(toRender);
    
    
  })
  
  //@ts-ignore
  unverifyElement.removeAttribute("href")
  unverifyElement.addEventListener("click", async function(){
    
    //@ts-expect-error
    document.querySelectorAll('.sg-dropdown')[1].children[0].innerText = unverifyElement.innerText
    Status.Show("Fetching unverification requests", "blue", true, false);
    let toRender = await get_next_page_unverify('0')
    document.querySelector(".displayMessage").remove();
    console.log(toRender)
    fn(toRender);
    
  })
  unverifyElement.removeAttribute("href") 
    
  
  
    
  
  
  
  
 
}
export function add_verification_record(RequesterId, RequesterName, HandlerId, HandlerName, HandledTime, QuestionSubject, QuestionLink, RejectApprove, AnswerID){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "requester": {
      "id": RequesterId,
      "name": RequesterName
    },
    "handler": {
      "id": HandlerId,
      "name": HandlerName,
      "handledTime": HandledTime,
      "action":RejectApprove
    },
    "question": {
      "subject": QuestionSubject,
      "link": 'https://brainly.com/question/'+QuestionLink,
      "answerID":AnswerID
    },
    
  
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
    
  };

  fetch("https://server.grayson03.repl.co/verification-handled", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
