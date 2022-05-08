import {insert_ticket} from "../../common/ModFunctions"
import { addOnlyChecks } from "./Tasks"
import {
  add_icons,
  copy_links,
  select_all,
  toggle_selected
} from "./ContentPageButtons"
import { parseQuestionLink } from "configs/config"
import {getCookie} from "../../common/CommonFunctions"
export function selectAll(){
    let checkBoxes = document.getElementsByClassName("contentCheckboxes")
    for (let i = 0; i < checkBoxes.length; i++) {
        // @ts-ignore
        checkBoxes[i].checked = 'true'
    }
}
export function addTaskButtonsBasic(){
  let buttonArea = document.querySelector("#content-old > div:nth-child(3) > p")
  let content = document.querySelectorAll("#content-old > div:nth-child(2) > div:nth-child(25) > table > tbody > tr")
  document.querySelector("thead tr").insertAdjacentHTML("afterbegin", "<th style = 'width: 5%'></th>")
  for (let i = 0; i < content.length; i++) {
      content[i].children[1].classList.add("iconcell")
      content[i].insertAdjacentHTML('afterbegin', /*html*/`
      <td class="sg-space-x-m" style = "padding-left: 8px">
          <label class="sg-checkbox" for="${i}"><input type="checkbox" class="sg-checkbox__element contentCheckboxes" id="${i}">
          <div class="sg-checkbox__ghost" aria-hidden="true">
          <div class="sg-icon sg-icon--adaptive sg-icon--x16">
              <svg class="sg-icon__svg" role="img" aria-labelledby="title-check-255xyo" focusable="false"><text id="title-check-255xyo" hidden="">check</text>
              <use xlink:href="#icon-check" aria-hidden="true"></use></svg>
          </div>
          </div>
          </label>
      </td>
      
  `)
  
  }
  buttonArea.insertAdjacentHTML('afterend', copy_links())
  buttonArea.insertAdjacentHTML('afterend', toggle_selected())
  buttonArea.insertAdjacentHTML('afterend', select_all())
  document.getElementById("selectAll").addEventListener("click", function(){selectAll()})
  document.getElementById("toggleSelected").addEventListener("click", function(){toggleSelection()})
  document.getElementById("copyLinks").addEventListener("click", function(){copyLinks()})
}
export function copyLinks() {
    let checkBoxes = document.getElementsByClassName("sg-checkbox__element")
    let links = []
    for (let i = 0; i < checkBoxes.length; i++) {
        //@ts-ignore
        if (String(checkBoxes[i].checked) === "true") {
            links.push(checkBoxes[i].closest("tr").getElementsByTagName('a')[0].href)
        }
    }
    let joinLinks = links.join("\n")
    navigator.clipboard.writeText(joinLinks)
        .then(() => {
            // Success!
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
    links = []
}
export function toggleSelection(){
    let checkBoxes = document.getElementsByClassName("contentCheckboxes")
    for (let i = 0; i < checkBoxes.length; i++) {
        //@ts-ignore
        if (String(checkBoxes[i].checked) === "true") {
            //@ts-ignore
            checkBoxes[i].checked = false
        } else {
            //@ts-ignore
            checkBoxes[i].checked = true
        }
    }
}
export async function showDelrsn(type:string){
    if(document.querySelector(".delmenu").classList.contains("show")){
      document.querySelector(".delmenu").classList.remove("show");
      
    }else{
    //open ticket, get response, close it
    document.querySelector(".primary-items").innerHTML = '';
    let id = document.querySelector("tbody a").getAttribute("href").replace("/question/","");
    document.querySelector("#deleteSelected .spinner-container").classList.add("show");
    let res = await fetch(`https://brainly.com/api/28/moderation_new/get_content`, { method: "POST",body: (`{"model_type_id":1,"model_id":${id},"schema":"moderation.content.get"}`)}).then(data => data.json());
    document.querySelector("#deleteSelected .spinner-container").classList.remove("show");
    document.querySelector(".delmenu").classList.toggle("show");
    fetch(`https://brainly.com/api/28/moderate_tickets/expire`,{method: "POST", body:`{"model_id":${id},"model_type_id":1,"schema":"moderation.ticket.expire"}`})
    let del_reasons;
    if(type === "questions"){
      del_reasons = res.data.delete_reasons.task;
    }
    else if(type === "answers"){
      del_reasons = res.data.delete_reasons.response;
    }
    console.log(JSON.stringify(res.data.delete_reasons))
    
    //inserting primary deletion reasons

    for(let i = 0; i < del_reasons.length; i++){
      document.querySelector(".primary-items").insertAdjacentHTML("beforeend",/*html*/`
        <label class="sg-radio sg-radio--xxs" for="r${del_reasons[i].id}">
          <input type="radio" class="sg-radio__element" name="group1" id="r${del_reasons[i].id}" index = "${i}">
          <span class="sg-radio__ghost" aria-hidden="true"></span>
          <span class="sg-text sg-text--small sg-text--bold sg-radio__label">${del_reasons[i].text}</span>
        </label>`
      )
    }
    
    //detect selection of primary deletion reason
    document.querySelector(".primary-items").addEventListener("change", async function(){
      
      document.querySelector(".delmenu").classList.add("secondary");
      let selected_index = document.querySelector(".primary-items input:checked").getAttribute("index");
      let selected_subcats = del_reasons[selected_index].subcategories;
      console.log(selected_subcats);
      document.querySelector(".secondary-items").innerHTML = '';
      //inserting secondary deletion reasons
      for(let i = 0; i < selected_subcats.length; i++){
        document.querySelector(".secondary-items").insertAdjacentHTML("beforeend",/*html*/`
          <label class="sg-radio sg-radio--xxs" for="s${selected_subcats[i].id}">
            <input type="radio" class="sg-radio__element" name="group2" id="s${selected_subcats[i].id}" index = "${i}">
            <span class="sg-radio__ghost" aria-hidden="true"></span>
            <span class="sg-text sg-text--small sg-text--bold sg-radio__label">${selected_subcats[i].title}</span>
          </label>`
        )
      }
      //show deletion reason in textarea
      document.querySelector(".secondary-items").addEventListener("change", function(){
        let selected_reason = selected_subcats[document.querySelector(".secondary-items input:checked").getAttribute("index")]
        console.log(selected_reason);
        (<HTMLInputElement>document.querySelector("textarea.deletion-reason")).value = selected_reason.text;
      });
    });
  }
}
export async function confirmDeletionQuestions(){
  document.querySelector("#delete  .spinner-container").classList.add("show");
  let checkBoxes = document.getElementsByClassName("contentCheckboxes")
  let idsToDelete = []
  for (let i = 0; i < checkBoxes.length; i++) {
      //@ts-ignore
      if (String(checkBoxes[i].checked) === "true") {
          //@ts-ignore
          let link = checkBoxes[i].closest("tr").getElementsByTagName('a')[0].href
          let id = parseQuestionLink(link)
          idsToDelete.push(id)
      } 
  }
  
  for (let i = 0; i < idsToDelete.length; i++) {
   
      let model_type_id = 1;
      let type = "task"
      //@ts-expect-error
      let reason = document.querySelectorAll(".deletion-reason")[0].value
      //@ts-expect-error
      let warn = document.querySelector("#warn").checked
      //@ts-expect-error
      let take_point = document.querySelector("#pts").checked
      await fetch(`https://brainly.com/api/28/moderation_new/delete_${type}_content`, {
          method: "POST",
          body:JSON.stringify({
            "reason_id":2,
            "reason":reason,
            "give_warning":warn,
            "take_points": take_point,
            "schema":`moderation.${type}.delete`,
            "model_type_id":model_type_id,
            "model_id":idsToDelete[i],
          })
        })
  
  }
  document.querySelector("#delete  .spinner-container").classList.remove("show");
}
export function addticket(){
    let n_content = document.querySelector("tbody");
    for(let i = 0; i < n_content.childElementCount; i++){ 
        let row = document.querySelector("tbody").children[i];
        let cell = row.children[1];
        let qid = row.querySelector("a").getAttribute("href").replace("/question/","");
        cell.insertAdjacentHTML("afterbegin",/*html*/`
        <div class="modticket">
        <div class="sg-spinner-container__overlay">
          <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
        </div>
        <div class="contenticon shield">
            <svg viewBox="0 0 512 512" style="overflow: visible" id="icon-shield" xmlns="http://www.w3.org/2000/svg">
                <title>Moderate</title>
                <path fill-rule="evenodd" d="M256 448c-32 0-192-16-192-192V96c0-11 6-32 32-32h320c11 0 32 6 32 32v176c0 160-160 176-192 176zm128-320H256v256c102 0 128-85 128-128V128z" clip-rule="evenodd"/>
            </svg>
        </div>
        </div>
        `); 
        row.querySelector(".contenticon.shield").addEventListener("click", function(){
            insert_ticket(qid, row.querySelector(".modticket > .sg-spinner-container__overlay"));
        });
    } 
}
export async function confirmDeletionAnswers(){
  document.querySelector("#delete  .spinner-container").classList.add("show");
  let checkBoxes = document.getElementsByClassName("contentCheckboxes")
  let idsToDelete = []
  for (let i = 0; i < checkBoxes.length; i++) {
      //@ts-ignore
      if (String(checkBoxes[i].checked) === "true") {
          //@ts-ignore
          let link = checkBoxes[i].closest("tr").getElementsByTagName('a')[0].href
          let id = parseQuestionLink(link)
          idsToDelete.push(id)
      } 
  }
  
  let answerIDtoDelete = []
  for (let i = 0; i < idsToDelete.length; i++) {
    
    let questionID = idsToDelete[i]
    let res = await fetch(`https://brainly.com/api/28/moderation_new/get_content`, { method: "POST",body: (`{"model_type_id":1,"model_id":${questionID},"schema":"moderation.content.get"}`)}).then(data => data.json());
    await fetch(`https://brainly.com/api/28/moderate_tickets/expire`,{method: "POST", body:`{"model_id":${questionID},"model_type_id":1,"schema":"moderation.ticket.expire"}`})
    let answers = res.data.responses
    let times = 0
    
   
    if (answers.length === 1){
      times = 1
    } else {
      times = 2
    }
    for (let x = 0; x < times; x++) {
      
      let user = String(answers[x]["user_id"])
      if (user === String(window.location.href.split("/")[5])){
        answerIDtoDelete.push(answers[x]["id"])
      }
    }
    
  }

  let success = 0
  let fail = 0
  for (let i = 0; i < answerIDtoDelete.length; i++) {
   
      let model_type_id = 2;
      let type = "response"
      //@ts-expect-error
      let reason = document.querySelectorAll(".deletion-reason")[0].value
      //@ts-expect-error
      let warn = document.querySelector("#warn").checked
      //@ts-expect-error
      let take_point = document.querySelector("#pts").checked
      let response = await fetch(`https://brainly.com/api/28/moderation_new/delete_${type}_content`, {method: "POST",body:JSON.stringify({"reason_id":2,"reason":reason,"give_warning":warn,"take_points": take_point,"schema":`moderation.${type}.delete`,"model_type_id":model_type_id,"model_id":answerIDtoDelete[i]})}).then(data => data.json());;
      console.log(response)
      if (response["success"] === true){
        success+=1
      } else {
        fail +=1
      }
  }

  if (fail > 0){
    let banner = document.createElement('div')
    document.querySelector("#flash-msg").appendChild(banner)
    banner.outerHTML = `<div aria-live="assertive" class="sg-flash" role="alert">
                <div class="sg-flash__message sg-flash__message--error">
                <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${success} removed, ${fail} had an error. Make sure they weren't already deleted.</div>
                </div>
            </div>`
    document.querySelector(".sg-flash").addEventListener("click",function(){
      this.remove();
    })
  } else {
    let banner = document.createElement('div')
    document.querySelector("#flash-msg").appendChild(banner)
    banner.outerHTML = `<div aria-live="assertive" class="sg-flash" role="alert">
                <div class="sg-flash__message sg-flash__message--success">
                <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${success} removed successfully!</div>
                </div>
            </div>`
    document.querySelector(".sg-flash").addEventListener("click",function(){
      this.remove();
    })
  }
  
  document.querySelector("#delete  .spinner-container").classList.remove("show");
}
export async function unverifyAnswers(){
  document.querySelector("#unverify  .spinner-container").classList.add("show");
  let checkBoxes = document.getElementsByClassName("contentCheckboxes")
  let idsToUnverify = []
  for (let i = 0; i < checkBoxes.length; i++) {
      //@ts-ignore
      if (String(checkBoxes[i].checked) === "true") {
          //@ts-ignore
          let link = checkBoxes[i].closest("tr").getElementsByTagName('a')[0].href
          let id = parseQuestionLink(link)
          idsToUnverify.push(id)
      } 
  }
  
  let answerIDtoUnverify = []
  let questionIDsafety = ""
  for (let i = 0; i < idsToUnverify.length; i++) {
    
    let questionID = idsToUnverify[i]
    questionIDsafety = idsToUnverify[i]
    let res = await fetch(`https://brainly.com/api/28/moderation_new/get_content`, { method: "POST",body: (`{"model_type_id":1,"model_id":${questionID},"schema":"moderation.content.get"}`)}).then(data => data.json());
    await fetch(`https://brainly.com/api/28/moderate_tickets/expire`,{method: "POST", body:`{"model_id":${questionID},"model_type_id":1,"schema":"moderation.ticket.expire"}`})
    let answers = res.data.responses
    let times = 0
    
   
    if (answers.length === 1){
      times = 1
    } else {
      times = 2
    }
    for (let x = 0; x < times; x++) {
      
      let user = String(answers[x]["user_id"])
      if (user === String(window.location.href.split("/")[5])){
        answerIDtoUnverify.push(answers[x]["id"])
      }
    }
    
  }

  let success = 0
  let fail = 0
  for (let i = 0; i < answerIDtoUnverify.length; i++) {
   
      let model_type_id = 2;
      let type = "response"
      //@ts-expect-error
      let reason = document.querySelectorAll(".deletion-reason")[0].value
      //@ts-expect-error
      let warn = document.querySelector("#warn").checked
      //@ts-expect-error
      let take_point = document.querySelector("#pts").checked
      var myHeaders = new Headers();
      myHeaders.append("authority", "brainly.com");
      myHeaders.append("accept", "application/json");
      myHeaders.append("accept-language", "en-US,en;q=0.9");
      myHeaders.append("content-type", "application/json");
      myHeaders.append("origin", "https://brainly.com");
      myHeaders.append("referer", "https://brainly.com/question/"+questionIDsafety);
      myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36");
      
      var raw = JSON.stringify({
        "model_type": 2,
        "model_id": answerIDtoUnverify[i]
      });
      
      
      let response = await fetch(`https://brainly.com/api/28/api_content_quality/unconfirm`, { method: "POST",body: raw}).then(data => data.json());;
      console.log(response)
      if (response["success"] === true){
        success+=1
      } else {
        fail +=1
      }
  }

  if (fail > 0){
    let banner = document.createElement('div')
    document.querySelector("#flash-msg").appendChild(banner)
    banner.outerHTML = `<div aria-live="assertive" class="sg-flash" role="alert">
                <div class="sg-flash__message sg-flash__message--error">
                <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${success} unapproved, ${fail} had an error. Do you have Super Moderator permissions?</div>
                </div>
            </div>`
    document.querySelector(".sg-flash").addEventListener("click",function(){
      this.remove();
    })
  } else {
    let banner = document.createElement('div')
    document.querySelector("#flash-msg").appendChild(banner)
    banner.outerHTML = `<div aria-live="assertive" class="sg-flash" role="alert">
                <div class="sg-flash__message sg-flash__message--success">
                <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${success} unapproved successfully!</div>
                </div>
            </div>`
    document.querySelector(".sg-flash").addEventListener("click",function(){
      this.remove();
    })
  }
  document.querySelector("#unverify  .spinner-container").classList.remove("show");
}
export async function approveAnswers(){
    document.querySelector("#approveSelected  .spinner-container").classList.add("show");
    let checkBoxes = document.getElementsByClassName("contentCheckboxes")
    let idsToVerify = []
    for (let i = 0; i < checkBoxes.length; i++) {
        //@ts-ignore
        if (String(checkBoxes[i].checked) === "true") {
            //@ts-ignore
            let link = checkBoxes[i].closest("tr").getElementsByTagName('a')[0].href
            let id = parseQuestionLink(link)
            idsToVerify.push(id)
        } 
    }
    
    let answerIDtoVerify = []
    let questionIDsafety = ""
    for (let i = 0; i < idsToVerify.length; i++) {
      
      let questionID = idsToVerify[i]
      questionIDsafety = idsToVerify[i]
      let res = await fetch(`https://brainly.com/api/28/moderation_new/get_content`, { method: "POST",body: (`{"model_type_id":1,"model_id":${questionID},"schema":"moderation.content.get"}`)}).then(data => data.json());
      await fetch(`https://brainly.com/api/28/moderate_tickets/expire`,{method: "POST", body:`{"model_id":${questionID},"model_type_id":1,"schema":"moderation.ticket.expire"}`})
      let answers = res.data.responses
      let times = 0
      
     
      if (answers.length === 1){
        times = 1
      } else {
        times = 2
      }
      for (let x = 0; x < times; x++) {
        
        let user = String(answers[x]["user_id"])
        if (user === String(window.location.href.split("/")[5])){
          answerIDtoVerify.push(answers[x]["id"])
        }
      }
      
    }
  
    let success = 0
    let fail = 0
    for (let i = 0; i < answerIDtoVerify.length; i++) {
     
        let model_type_id = 2;
        let type = "response"
        //@ts-expect-error
        let reason = document.querySelectorAll(".deletion-reason")[0].value
        //@ts-expect-error
        let warn = document.querySelector("#warn").checked
        //@ts-expect-error
        let take_point = document.querySelector("#pts").checked
        var myHeaders = new Headers();
        myHeaders.append("authority", "brainly.com");
        myHeaders.append("accept", "application/json");
        myHeaders.append("accept-language", "en-US,en;q=0.9");
        myHeaders.append("content-type", "application/json");
        myHeaders.append("origin", "https://brainly.com");
        myHeaders.append("referer", "https://brainly.com/question/"+questionIDsafety);
        myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36");
        
        var raw = JSON.stringify({
          "model_type": 2,
          "model_id": answerIDtoVerify[i]
        });
        
        
        let response = await fetch(`https://brainly.com/api/28/api_content_quality/confirm`, { method: "POST",body: raw}).then(data => data.json());;
        console.log(response)
        if (response["success"] === true){
          success+=1
        } else {
          fail +=1
        }
    }
  
    if (fail > 0){
      let banner = document.createElement('div')
      document.querySelector("#flash-msg").appendChild(banner)
      banner.outerHTML = `<div aria-live="assertive" class="sg-flash" role="alert">
                  <div class="sg-flash__message sg-flash__message--error">
                  <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${success} approved, ${fail} had an error. Maybe already approved?</div>
                  </div>
              </div>`
      document.querySelector(".sg-flash").addEventListener("click",function(){
        this.remove();
      })
    } else {
      let banner = document.createElement('div')
      document.querySelector("#flash-msg").appendChild(banner)
      banner.outerHTML = `<div aria-live="assertive" class="sg-flash" role="alert">
                  <div class="sg-flash__message sg-flash__message--success">
                  <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${success} approved successfully!</div>
                  </div>
              </div>`
      document.querySelector(".sg-flash").addEventListener("click",function(){
        this.remove();
      })
    }
    document.querySelector("#approveSelected  .spinner-container").classList.remove("show");
}
export async function confirmAnswers(){
  document.querySelector("#confirmSelectedAnswers  .spinner-container").classList.add("show");
  let checkBoxes = document.getElementsByClassName("contentCheckboxes")
  let idsToConfirm = []
  for (let i = 0; i < checkBoxes.length; i++) {
      //@ts-ignore
      if (String(checkBoxes[i].checked) === "true") {
          //@ts-ignore
          let link = checkBoxes[i].closest("tr").getElementsByTagName('a')[0].href
          let id = parseQuestionLink(link)
          idsToConfirm.push(id)
      } 
  }

  let answerIDtoConfirm= []
  let questionIDsafety = ""
  for (let i = 0; i < idsToConfirm.length; i++) {
    
    let questionID = idsToConfirm[i]
    questionIDsafety =  idsToConfirm[i]
    let res = await fetch(`https://brainly.com/api/28/moderation_new/get_content`, { method: "POST",body: (`{"model_type_id":1,"model_id":${questionID},"schema":"moderation.content.get"}`)}).then(data => data.json());
    await fetch(`https://brainly.com/api/28/moderate_tickets/expire`,{method: "POST", body:`{"model_id":${questionID},"model_type_id":1,"schema":"moderation.ticket.expire"}`})
   
    if (res.success){
      let answers = res.data.responses
      let times = 0
      
      
      if (answers.length === 1){
        times = 1
      } else {
        times = 2
      }
      for (let x = 0; x < times; x++) {
        
        let user = String(answers[x]["user_id"])
        if (user === String(window.location.href.split("/")[5])){
          answerIDtoConfirm.push(answers[x]["id"])
        }
      }
    } else {
      console.log("Skipped a ticket due to reservation by another mod.")
    }
    
    
  }

  let success = 0
  let fail = 0
  for (let i = 0; i < answerIDtoConfirm.length; i++) {
    
      
     
      
     
      
      
      let myToken = getCookie("Zadanepl_cookie[Token][Long]")
      
      let response = await fetch("https://brainly.com/graphql/us", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-b-token-long": myToken
        },
        "referrer": "https://brainly.com/tools/moderation",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"operationName\":\"AcceptModerationReportContent\",\"variables\":{\"input\":{\"contentType\":\"Answer\",\"contentId\":${answerIDtoConfirm[i]}}},\"query\":\"mutation AcceptModerationReportContent($input: AcceptModerationReportContentInput!) {\\n  acceptModerationReportContent(input: $input) {\\n    validationErrors {\\n      error\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      }).then(data => data.json());;
      
  }

 
  document.querySelector("#confirmSelectedAnswers  .spinner-container").classList.remove("show");
  window.location.reload()
}
export async function confirmQuestions(){
  document.querySelector("#confirmSelectedQuestions  .spinner-container").classList.add("show");
  let checkBoxes = document.getElementsByClassName("contentCheckboxes")
  let idsToConfirm = []
  for (let i = 0; i < checkBoxes.length; i++) {
      //@ts-ignore
      if (String(checkBoxes[i].checked) === "true") {
          //@ts-ignore
          let link = checkBoxes[i].closest("tr").getElementsByTagName('a')[0].href
          let id = parseQuestionLink(link)
          idsToConfirm.push(id)
      } 
  }
  
  let myToken = getCookie("Zadanepl_cookie[Token][Long]")
  for (let i = 0; i < idsToConfirm.length; i++) {
   
    await fetch(`https://brainly.com/api/28/moderation_new/accept`, {
      "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-b-token-long": myToken,
        "x-requested-with": "XMLHttpRequest"
      },
      "referrer": "https://brainly.com/tasks/archive_mod",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"model_type_id\":1,\"model_id\":${idsToConfirm[i]},\"schema\":\"moderation.content.ok\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
  
  }
  document.querySelector("#confirmSelectedQuestions  .spinner-container").classList.remove("show");
  window.location.reload();
}
export async function find_reported_content(id,type){
  const foundReported = []
  let pagenum = document.querySelector("#content-old > div:nth-child(3) > p").children.length-2;
  
  document.querySelector("#fetchReported  .spinner-container").classList.add("show");
  for(let p=1; p<pagenum; p++){

    
    let content_page = await fetch(`https://brainly.com/users/user_content/${id}/${type}/${p}/0`, {
      method:"GET",
      headers:{
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
      }
    }).then(data => data.text())
        //@ts-ignore
    let responseHTML = new DOMParser().parseFromString(content_page, "text/html")
    
    //@ts-ignore
    if(!responseHTML.querySelector(".border-error")){ 
      //@ts-ignore
      let content =  responseHTML.querySelector("tbody").children
      for (let i = 0; i < content.length; i++) {
        let contentlink = content[i]
        let xhr = new XMLHttpRequest();
        
        xhr.withCredentials = true;
  
        contentlink.children[1].classList.add("iconcell");
        let qid = contentlink.querySelector("a").href.replace("https://brainly.com/question/", "");
  
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            let resp = JSON.parse(this.responseText);
  
            if(resp.data.task.settings.is_marked_abuse === true){
              let questionData = {"questionID": resp.data.task.id, "content":resp.data.task.content, "timeCreated":resp.data.task.created, "subject":resp.data.task.subject_id}
              foundReported.push(questionData)
            }

             if (type === "responses"){
                  let r = JSON.parse(this.responseText);
                  let userId = window.location.href.replace("https://brainly.com/users/user_content/","").split("/")[0]
                let response = r.data.responses.find(res => String(res.user_id) === String(userId));
                
                  if(response.settings.is_marked_abuse === true){
                    let questionData = {"questionID":r.data.task.id, "content":response.content, "timeCreated":response.created, "subject":r.data.task.subject_id}
                    foundReported.push(questionData)
                    }
              }
          }
        });
        xhr.open("POST", `https://brainly.com/api/28/api_tasks/main_view/"+qid+"?accept=application/json`);
        xhr.send();
        }
    } 
    
}

let subjects = [
    {
        "id": 2,
        "name": "Mathematics"
    },
    {
        "id": 5,
        "name": "History"
    },
    {
        "id": 1,
        "name": "English"
    },
    {
        "id": 8,
        "name": "Biology"
    },
    {
        "id": 18,
        "name": "Chemistry"
    },
    {
        "id": 15,
        "name": "Physics"
    },
    {
        "id": 3,
        "name": "Social Studies"
    },
    {
        "id": 31,
        "name": "Advanced Placement (AP)"
    },
    {
        "id": 32,
        "name": "SAT"
    },
    {
        "id": 7,
        "name": "Geography"
    },
    {
        "id": 6,
        "name": "Health"
    },
    {
        "id": 21,
        "name": "Arts"
    },
    {
        "id": 4,
        "name": "Business"
    },
    {
        "id": 19,
        "name": "Computers and Technology"
    },
    {
        "id": 29,
        "name": "French"
    },
    {
        "id": 30,
        "name": "German"
    },
    {
        "id": 28,
        "name": "Spanish"
    },
    {
        "id": 22,
        "name": "World Languages"
    },
    {
        "id": 33,
        "name": "Medicine"
    },
    {
        "id": 34,
        "name": "Law"
    },
    {
        "id": 35,
        "name": "Engineering"
    }
]
let table = document.querySelector("tbody")
table.innerHTML = ``

for (let i = 0; i < foundReported.length; i++) {
  let content = foundReported[i]["content"]
  var regex = /(<([^>]+)>)/ig
  let result = content.replace(regex, "");
  const found = subjects.find(element => element["id"] === foundReported[i]["subject"]);
 
  let row = document.createElement("div") 
     table.appendChild(row)
   row.outerHTML = `<tr>
<td>${i+1}</td>
<td class="iconcell">
        <div class="contenticon shield">
          
        </div>
       <a href="/question/${foundReported[i]["questionID"]}" style=" display: -webkit-box;
       -webkit-line-clamp: 1;
       -webkit-box-orient: vertical;
       overflow: hidden;">
       ${String(result)}
</a>
</td>
<td>${found["name"]}</td>
<td>${foundReported[i]["timeCreated"]}</td>
`
   
}
add_icons()
addOnlyChecks()
addticket()
document.querySelector("#fetchReported  .spinner-container").classList.remove("show");
}


