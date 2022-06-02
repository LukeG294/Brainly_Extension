import {
    deletion_menu,
    get_reported_content,
    approve_selected,
    delete_selected,
    unverify_selected,
    confirm_selected
} from "./ContentPageButtons"
import {
    parseQuestionLink
} from "configs/config"
import {
    getCookie
} from "../../common/CommonFunctions"
import { showDelrsn, confirmDeletion } from "./ButtonFunctions"
import Notify from "../../common/Notifications/Notify"
import {
    Answer,
    Question
} from "../../common/Content"
import BasicFn from "./BasicFn"

export default new class ModFn{

    async approveAnswers(elem) {
        elem.insertAdjacentHTML('beforeend', approve_selected())
        document.querySelector("#approveSelected").addEventListener("click", function(){
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
    
        idsToVerify.forEach(async element => {
            let questionID = element
            let qobj = new Question()
            let questionObjectData = await qobj.Get(questionID)
                //@ts-ignore
            let answers = questionObjectData.data.responses
            let times = 0
    
    
            if (answers.length === 1) {
                times = 1
            } else {
                times = 2
            }
            for (let x = 0; x < times; x++) {
    
                let user = String(answers[x]["user_id"])
                if (user === String(window.location.href.split("/")[5])) {
    
                    let answerObj = new Answer()
                    await answerObj.Approve(answers[x]["id"])
                }
            }
        });
    
        Notify.Flash("Approved Selected Answers!", "success")
        document.querySelector("#approveSelected  .spinner-container").classList.remove("show");
    });
    }
    unverifyAnswers(elem) {
        elem.insertAdjacentHTML('beforeend', unverify_selected());
        document.querySelector("#unverify").addEventListener("click", function(){
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
        idsToUnverify.forEach((id) => {
            let questionID = id
    
            let qObj = new Question()
            let res = qObj.Get(questionID)
                //@ts-ignore
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
                    let answer = new Answer()
                    answer.Unapprove(answers[x]["id"])
    
                }
            }
        })
    
        let success = 0
        let fail = 0
    
        Notify.Flash(`${success} unapproved, ${fail} had an error. Do you have Super Moderator permissions?`, "success")
    
        document.querySelector("#unverify  .spinner-container").classList.remove("show");
        });
    }
    confirmAnswers(elem) {
        elem.insertAdjacentHTML('beforeend', confirm_selected())
        document.querySelector("#confirmSelected").addEventListener("click", function(){
        document.querySelector("#confirmSelected .spinner-container").classList.add("show");
        let checkBoxes = document.getElementsByClassName("contentCheckboxes")
    
        let checkBoxesArr = Array.from(checkBoxes)
        checkBoxesArr.forEach(async element => {
            //@ts-expect-error
            if (String(element.checked) === "true") {
                //@ts-ignore
                let link = element.closest("tr").getElementsByTagName('a')[0].href
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
                            ansObj.Confirm(answers[x]["id"])
                        }
                    }
                } else {
                    console.log("Skipped a ticket due to reservation by another mod.")
                }
    
            }
        });
        Notify.Flash("Confirmed selected answers!", "success");
        document.querySelector("#confirmSelected  .spinner-container").classList.remove("show");
        });
    }
    confirmQuestions(elem) {
        elem.insertAdjacentHTML('beforeend', confirm_selected())
        document.querySelector("#confirmSelected").addEventListener("click", function(){
        document.querySelector("#confirmSelected  .spinner-container").classList.add("show");
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
        idsToConfirm.forEach(async element => {
            let ansObj = new Answer();
            ansObj.Confirm(element)
        });
    
    
        document.querySelector("#confirmSelected  .spinner-container").classList.remove("show");
        Notify.Flash("Questions confirmed successfully!", "success")
        });
    }
    delete(elem, type){
        elem.insertAdjacentHTML("afterend", deletion_menu());
        elem.insertAdjacentHTML("beforeend", delete_selected());
        document.querySelector("#deleteSelected").addEventListener("click", function(){showDelrsn(type)})
        document.querySelector(".confirmdel").addEventListener("click", function(){confirmDeletion(type)})
    }
    async find_reported_content(id, type: "responses" | "tasks", elem) {
        elem.insertAdjacentHTML('beforeend', get_reported_content())
        document.querySelector("#fetchReported").addEventListener("click", async function(){
            const foundReported = []
            let pagenum = document.querySelector("#content-old > div:nth-child(3) > p").children.length-2;
            
            document.querySelector("#fetchReported  .spinner-container").classList.add("show");
            for(let p=1; p<pagenum; p++){
                console.log("page", p)
                //@ts-ignore
                let content = await fetch(`https://brainly.com/users/user_content/${id}/${type}/${p}/0`).then(data => data.text())
                //@ts-ignore
                let responseHTML = new DOMParser().parseFromString(content, "text/html")

                if(!responseHTML.querySelector(".border-error")){ 
                    //@ts-ignore
                    console.log(responseHTML);
                    let content =  responseHTML.querySelector("tbody").children;
                    for (let i = 0; i < content.length; i++) {
                        let contentlink = content[i]
                        let qid = contentlink.querySelector("a").href.replace("https://brainly.com/question/", "");
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                let resp = JSON.parse(this.responseText);
                                if (type === "responses"){
                                    let userId = window.location.href.replace("https://brainly.com/users/user_content/","").split("/")[0]
                                    let response = resp.data.responses.find(res => String(res.user_id) === String(userId));
                                    if(response.settings.is_marked_abuse){
                                        let questionData = {"questionID":resp.data.task.id, "content":response.content, "timeCreated":response.created, "subject":resp.data.task.subject_id}
                                        foundReported.push(questionData)
                                    }
                                }
                                if(type === "tasks"){
                                    if(resp.data.task.settings.is_marked_abuse){
                                        let questionData = {"questionID": resp.data.task.id, "content":resp.data.task.content, "timeCreated":resp.data.task.created, "subject":resp.data.task.subject_id}
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
            let subjects = await fetch(`https://brainly.com/api/28/api_config/desktop_view`).then(data => data.json()).then(data => data.data.subjects);
            let table = document.querySelector("tbody")
            table.innerHTML = ``

            for (let i = 0; i < foundReported.length; i++) {
                let content = foundReported[i]["content"]
                var regex = /(<([^>]+)>)/ig
                let result = content.replace(regex, "");
                const found = subjects.find(element => element["id"] === foundReported[i]["subject"]);
                
                let row = document.createElement("div") 
                table.appendChild(row)
                row.outerHTML = /*html*/`
                <tr>
                    <td>${i}</td>
                    <td>
                        <a href="/question/${foundReported[i].questionID}">
                            ${String(result)}
                        </a>
                    </td>
                    <td>${found.name}</td>
                    <td>${foundReported[i].timeCreated}</td>
                </tr>
                `
            }

            BasicFn.add_icons();
            BasicFn.checkboxes();
            BasicFn.addticket();
            document.querySelector("#fetchReported  .spinner-container").classList.remove("show");
        })
    }
}