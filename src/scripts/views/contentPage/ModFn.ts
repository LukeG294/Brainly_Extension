import Components from "scripts/Items/Components"

import {
  parseProfileLink,
  parseQuestionLink
} from "configs/config"
import { confirmDeletion } from "./ButtonFunctions"
import Notify from "../../common/Notifications/Notify"
import {
  Answer,
  Question
} from "../../common/Content"
import insertDelMenu from "@lib/insertDelMenu"
import Status from "scripts/common/Notifications/Status"
import { RenderItems } from "./ContentPageButtons"

export default new class ModFn {

  approveAnswers(elem) {
    elem.insertAdjacentElement('beforeend', Components.Button({
      size: "m",
      type: "solid",
      text: "Verify",
      icon: "verified",
      ClassNames: ["mapprove"]
    }))
    let mass_approve = document.querySelector(".mapprove")
    mass_approve.insertAdjacentHTML("beforeend", ` <div class="sg-spinner-container__overlay">
    <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
  </div>`)
    mass_approve.addEventListener("click", async function () {
      mass_approve.classList.add("shower")
      let checkBoxes = document.querySelectorAll(".contentCheckboxes input")
      let error = 0
      let done = 0
      let userid = window.location.href.split("/")[5]
      let page = window.location.href.split("/")[7]
      if (!page){
        page = "1"
      }
      let pageAnswers = await fetch(`https://brainly.com/api/28/api_responses/get_by_user?userId=${userid}&limit=25&page=${page}`).then(data => data.json())
      for (let i = 0; i < checkBoxes.length; i++) {
        
        //@ts-ignore
        if (String(checkBoxes[i].checked) === "true") {
          
          //@ts-ignore
          let box = checkBoxes[i].closest(".content-row")
          //@ts-ignore
          box.style.backgroundColor = '#E3F7ED'
          try {
            let ans = new Answer()
            ans.Approve(pageAnswers.data[i].id) 
            done += 1
          } catch(err) {
            error += 1 
          }
          
          
        }
      }
      mass_approve.classList.remove("shower")
      
      if (error === 0){
        Notify.Flash("Approved successfully!", "success")
      } else if (error === 1) {
        Notify.Flash(`Error with ${error} item. ${done} approved. Check ticket reservations.`, "error")
      } else {
        Notify.Flash(`Error with ${error} items. ${done} approved. Check ticket reservations.`, "error")
      }
     
    });
  }
  async unverifyAnswers(elem) {
    elem.insertAdjacentElement('beforeend', Components.Button({
      size: "m",
      text: "Unverify",
      type: "solid",
      icon: "thumb_down",
      ClassNames: ["munverify"]
    }));
    let mass_unverify = document.querySelector(".munverify")
    mass_unverify.insertAdjacentHTML("beforeend", ` <div class="sg-spinner-container__overlay">
    <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
  </div>`)
    mass_unverify.addEventListener("click", async function () {
      //@ts-ignore
      mass_unverify.classList.add("shower")
      let checkBoxes = document.querySelectorAll(".contentCheckboxes input")
      let suc = 0
      let fail = 0
      let userid = window.location.href.split("/")[5]
      let page = window.location.href.split("/")[7]
      if (!page){
        page = "1"
      }
      let pageAnswers = await fetch(`https://brainly.com/api/28/api_responses/get_by_user?userId=${userid}&limit=25&page=${page}`).then(data => data.json())
      for (let i = 0; i < checkBoxes.length; i++) {
        //@ts-ignore
        if (String(checkBoxes[i].checked) === "true") {
          //@ts-ignore
          let link = checkBoxes[i].closest(".content-row").getElementsByTagName('a')[0].href
          
         
          try {
            let ans = new Answer()
            let perm = ans.Unapprove(pageAnswers.data[i].id).then(data => data.json())
            if (perm["success"]) {
              suc += 1
            } else {
              fail += 1
            }
            
          } catch(err) {
            fail += 1 
          }

        }
      }

      if (fail > 0){
        Notify.Flash(`${suc} unverified, ${fail} could not unverify. Check permissions & reservations. Might already be verified.`, "error")
      } else {
        Notify.Flash(`${suc} unverified successfully`, "success")
      } 
      //@ts-ignore
      mass_unverify.classList.remove("shower")
      
   

      
    });
  }

  async confirmAnswers(elem) {
   
    elem.insertAdjacentElement('beforeend', Components.Button({
      size: "m",
      type: "solid",
      text: "Confirm",
      icon: "thumb_up_outlined",
      ClassNames: ["mconfirm"]
    }))
    let m_confirm = document.querySelector(".mconfirm")
    m_confirm.insertAdjacentHTML("beforeend", ` <div class="sg-spinner-container__overlay">
    <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
  </div>`)
    m_confirm.addEventListener("click", function () {
      
      m_confirm.classList.add("shower")
      let stat = new Status("confirm")
      stat.Show("Confirming Selected Answers...", "indigo", true)
      
      let checkBoxes = document.querySelectorAll(".contentCheckboxes input")

      let checkBoxesArr = Array.from(checkBoxes)
    
      checkBoxesArr.forEach(async element => {
        let box = element.closest(".content-row")
          //@ts-ignore
          
        //@ts-expect-error
        if (String(element.checked) === "true") {
          //@ts-ignore
          let link = element.closest(".content-row").getElementsByTagName('a')[0].href
          let id = parseQuestionLink(link)
          
          let qObj = new Question()
          let res = await qObj.Get(id)

          if (res.success) {
            
           
            //@ts-expect-error
            let answers = res.data.responses
            let times = 0

            if (answers.length === 1) {
              times = 1
            } else {
              times = 2
            }
            for (let x = 0; x < times; x++) {

              let user = String(answers[x]["user_id"])
              if (user === String(window.location.href.split("/")[5])) {
                let ansObj = new Answer()
                await ansObj.Confirm(answers[x]["id"])
                
                
              }
              //@ts-ignore
              box.style.backgroundColor = '#D9F0FF'
            }
            m_confirm.classList.remove("shower")
          } else {
            console.log("Skipped a ticket due to reservation by another mod.")
          }

        }
      });
      
      
      
      stat.Close()
    });
  }
  async confirmQuestions(elem) {
    elem.insertAdjacentElement('beforeend', Components.Button({
      size: "m",
      type: "solid",
      ClassNames: ["mconfirm"],
      icon: "thumb_up_outlined",
      text: "Confirm"
    }))
    let m_confirmQ = document.querySelector(".mconfirm")
    m_confirmQ.insertAdjacentHTML("beforeend", ` <div class="sg-spinner-container__overlay">
    <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
  </div>`)
    m_confirmQ.addEventListener("click", async function () {
      m_confirmQ.classList.add("shower")
      let stat = new Status("conf");
      stat.Show("Confirming Selected Questions...", "indigo", true)
      let checkBoxes = document.querySelectorAll(".contentCheckboxes input")
      let ansObj = new Question();
      for (let i = 0; i < checkBoxes.length; i++) {
        //@ts-ignore
        if (String(checkBoxes[i].checked) === "true") {
          //@ts-ignore
          let link = checkBoxes[i].closest(".content-row").getElementsByTagName('a')[0].href
          let id = parseQuestionLink(link)
          ansObj.Confirm(parseInt(id))
          const delay = ms => new Promise(res => setTimeout(res, ms));
          await delay(300)
          //@ts-ignore
          checkBoxes[i].closest(".content-row").style.backgroundColor = '#D9F0FF'
        }
      }

      stat.Close();
      m_confirmQ.classList.remove("shower")
      Notify.Flash("Confirmed selected questions!", "success")
    });
  }
  async afc(elem){
    elem.insertAdjacentElement("beforeend", Components.Button({
      type: "solid",
      size: "m",
      text: "Ask for Correction",
      ClassNames: ["mafc"],
      icon: "question",
      onClick: () => {
        let targetElem = document.querySelector("#content-old")
        if (document.querySelector(".delmenu") !== null){
          document.querySelector(".delmenu").remove()
        }
        if (document.querySelector(".afcmenu") === null){
          targetElem.insertAdjacentHTML("beforeend", /*html*/`<div class="afcmenu show">
        
       <textarea placeholder="Reason" class=" afc-reason sg-textarea sg-textarea--tall"></textarea>
        
        <div class="confirmafc">
            <button class="sg-button sg-button--m sg-button--outline">
              
              <span class="sg-button__text">Ask for Correction</span>
              <div class="sg-spinner-container__overlay">
                <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
             </div>
            </button>
          </div>
        </div>
      </div>`)
        let confirm_afc = document.querySelector(".confirmafc")
        confirm_afc.addEventListener("click", async function () {
          confirm_afc.classList.add("shower")
        let checkBoxes = document.querySelectorAll(".contentCheckboxes input")
        let error = 0
        let done = 0
        let userid = window.location.href.split("/")[5]
        let page = window.location.href.split("/")[7]
        if (!page){
          page = "1"
        }
        let pageAnswers = await fetch(`https://brainly.com/api/28/api_responses/get_by_user?userId=${userid}&limit=25&page=${page}`).then(data => data.json())
        for (let i = 0; i < checkBoxes.length; i++) {
          //@ts-ignore
          if (String(checkBoxes[i].checked) === "true") {

            //@ts-ignore
            let link = checkBoxes[i].closest(".content-row").getElementsByTagName('a')[0].href
            //@ts-ignore
            checkBoxes[i].closest(".content-row").style.backgroundColor = '#fedd8e'
            let id = parseQuestionLink(link)
           
            //@ts-ignore
            let box = checkBoxes[i].closest(".content-row")
            //@ts-ignore
            box.style.backgroundColor = '#fedd8e'
            
            try {
              let ans = new Answer()
              //@ts-ignore
              let r = await ans.AllowCorrection(document.querySelector(".afc-reason").value,pageAnswers.data[i].id)
              if (r.success){
                done += 1
              } else {
                error += 1
              }
              
            } catch(err) {
              error += 1 
            }
                
                
              
            
            confirm_afc.classList.remove("shower")
            
            
            
          }
          
          
        }
       
        confirm_afc.classList.remove("shower")
        if (error === 0){
          Notify.Flash("Opened successfully!", "success")
        } else if (error === 1) {
          Notify.Flash(`Error with ${error} item. ${done} opened. Check ticket reservations or see if it was already opened.`, "error")
        } else {
          Notify.Flash(`Error with ${error} items. ${done} opened. Check ticket reservations or see if they were already opened.`, "error")
        }
        
          })
        } else {document.querySelector(".afcmenu").remove();}
        
      }
    })
  )}
  async delete(elem, type: "tasks" | "responses") {
    elem.insertAdjacentElement("beforeend", Components.Button({
      type: "solid",
      size: "m",
      text: "Delete",
      ClassNames: ["mdelete"],
      icon: "trash",
      onClick: () => {
        document.querySelector(".mdelete").classList.add("shower")
        if (document.querySelector(".afcmenu") !== null){
          document.querySelector(".afcmenu").remove()
        }
        
        insertDelMenu(
          document.querySelector("#content-old") ,
          type,
          () => {
            if (type === "tasks") {
              return Array.from(document.querySelectorAll(".contentCheckboxes input:checked")).map(el => {
                return parseQuestionLink(el.closest(".content-row").querySelector("a").href)
              })
            } else {
              return Array.from(document.querySelectorAll(".contentCheckboxes input:checked")).map(el => {
                return el.closest(".content-row").getAttribute("resp")
              })
            }
          },
          () => {
            return Array.from(document.querySelectorAll(".contentCheckboxes input")).map(el => {
              return parseQuestionLink(el.closest(".content-row").querySelector("a").href)
            })
          },
          true,
          (element) => {
            if (type === "tasks") document.querySelector(`a[href = "/question/${element}"]`).closest(".content-row").classList.add("deleted")
            if (type === "responses") document.querySelector(`.content-row[resp = "${element}"]`).classList.add("deleted")
          }
          
        )
        
        document.querySelector(".mdelete").classList.remove("shower")
      }
      
    }));
    document.querySelector(".mdelete").insertAdjacentHTML("beforeend", ` <div class="sg-spinner-container__overlay">
    <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
  </div>`)
  }
  
  async find_reported_content(id, type: "responses" | "tasks", elem) {
    elem.insertAdjacentElement('beforeend', Components.Button({
      type: "solid",
      size: "m",
      icon: "report_flag_outlined",
      text: "Fetch Reported",
      ClassNames: ["fetchRep"]
    }))
    document.querySelector(".fetchRep").addEventListener("click", async function () {
      let stat = new Status("fetch");
      const foundReported = []
      let pagenum = document.querySelector("#content-old > div:nth-child(3) > p").children.length - 2;

      stat.Show("Fetching Reported Content...", "indigo", true)
      for (let p = 1; p < pagenum; p++) {
        console.log("page", p)
        //@ts-ignore
        let content = await fetch(`https://brainly.com/users/user_content/${id}/${type}/${p}/0`).then(data => data.text())
        //@ts-ignore
        let responseHTML = new DOMParser().parseFromString(content, "text/html")

        if (!responseHTML.querySelector(".border-error")) {
          //@ts-ignore
          console.log(responseHTML);
          let content = responseHTML.querySelector("tbody").children;
          let subjects = await fetch(`https://brainly.com/api/28/api_config/desktop_view`).then(data => data.json()).then(data => data.data.subjects);
          for (let i = 0; i < content.length; i++) {
            let contentlink = content[i]
            let qid = contentlink.querySelector("a").href.replace("https://brainly.com/question/", "");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                let resp = JSON.parse(this.responseText);
                if (type === "responses") {
                  let userId = window.location.href.replace("https://brainly.com/users/user_content/", "").split("/")[0]
                  let response = resp.data.responses.find(res => String(res.user_id) === String(userId));
                  if (response.settings.is_marked_abuse) {
                    let questionData = {
                      content: /*html*/`
                                                <a href="https://brainly.com/question/${resp.data.task.id}">${response.content.slice(0, 50)}</a>
                                            `,
                      date: response.created.replace("T", " "),
                      subject: subjects.find(element => element["id"] === resp.data.task.subject_id).icon
                    }
                    foundReported.push(questionData)
                  }
                }
                if (type === "tasks") {
                  if (resp.data.task.settings.is_marked_abuse) {
                    let questionData = {
                      content: /*html*/`
                                                <a href="https://brainly.com/question/${resp.data.task.id}">${resp.data.task.content.slice(0, 50)}</a>
                                            `,
                      date: resp.data.task.created.replace("T", " "),
                      subject: subjects.find(element => element["id"] === resp.data.task.subject_id).icon
                    }
                    foundReported.push(questionData)
                  }
                }
              }
            };
            xhttp.open("POST", `https://brainly.com/api/28/api_tasks/main_view/${qid}`);
            xhttp.send();
          }
        }
      }

      RenderItems(foundReported)
      document.querySelector(".content-items").classList.add("reportList")
      stat.Close()
    })
  }
}

