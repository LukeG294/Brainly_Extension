import Components from "scripts/HTML_exports/Components"
import {
    parseQuestionLink
} from "configs/config"
import {
    getCookie
} from "../../common/CommonFunctions"
import { deletion_menu} from "./ContentPageButtons"
import { showDelrsn, confirmDeletion } from "./ButtonFunctions"
import Notify from "../../common/Notifications/Notify"
import {
    Answer,
    Question
} from "../../common/Content"
import Status from "scripts/common/Notifications/Status"
import BasicFn from "./BasicFn"

export default new class ModFn{

    async approveAnswers(elem) {
        elem.insertAdjacentElement('beforeend', Components.Button({
            size: "m",
            type: "solid",
            text: "",
            icon: "verified",
            ClassNames: "approve"
        }))
        document.querySelector(".approve").addEventListener("click", function(){
        let stat = new Status("approve");
        stat.Show("Approving Selected Answers...", "indigo", true)
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
        stat.Close();
    });
    }
    unverifyAnswers(elem) {
        elem.insertAdjacentElement('beforeend', Components.Button({
            size: "m",
            text: "",
            type: "solid",
            icon: "thumb_down",
            ClassNames: "unverify"
        }));
        document.querySelector(".unverify").addEventListener("click", function(){
        document.querySelector(".unverify  .spinner-container").classList.add("show");
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
    
        document.querySelector(".unverify  .spinner-container").classList.remove("show");
        });
    }
    confirmAnswers(elem) {
        elem.insertAdjacentElement('beforeend', Components.Button({
            size: "m",
            type: "solid",
            text: "",
            icon: "spark",
            ClassNames: "confirm"
        }))
        document.querySelector(".confirm").addEventListener("click", function(){
        let stat = new Status("confirm")
        stat.Show("Confirming Selected Answers...", "indigo", true)
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
        stat.Close()
        });
    }
    confirmQuestions(elem) {
        elem.insertAdjacentElement('beforeend', Components.Button({
            size: "m",
            type: "solid",
            ClassNames: "confirm",
            icon: "spark",
            text: ""
        }))
        document.querySelector(".confirm").addEventListener("click", function(){
        let stat = new Status("conf");
        stat.Show("Confirming Selected Questions...", "indigo", true)
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
        idsToConfirm.forEach(async element => {
            let ansObj = new Answer();
            ansObj.Confirm(element)
        });
    
    
        stat.Close();
        Notify.Flash("Questions confirmed successfully!", "success")
        });
    }
    delete(elem, type){
        elem.insertAdjacentHTML("afterend", deletion_menu());
        elem.insertAdjacentElement("beforeend", Components.Button({
            type: "solid",
            size: "m",
            text: "",
            ClassNames: "delete",
            icon: "trash"
        }));
        document.querySelector(".delete").addEventListener("click", function(){showDelrsn(type)})
        document.querySelector(".confirmdel").addEventListener("click", function(){confirmDeletion(type)})
    }
    async find_reported_content(id, type: "responses" | "tasks", elem) {
        elem.insertAdjacentElement('beforeend', Components.Button({
            type: "solid",
            size: "m",
            icon: "report_flag_outlined",
            text: "",
            ClassNames: "fetchRep"
        }))
        document.querySelector(".fetchRep").addEventListener("click", async function(){
            let stat = new Status("fetch");
            const foundReported = []
            let pagenum = document.querySelector("#content-old > div:nth-child(3) > p").children.length-2;
            
            stat.Show("Fetching Reported Content...", "indigo", true)
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
            stat.Close()
        })
    }
}