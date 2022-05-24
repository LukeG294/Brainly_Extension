import {
    add_icons,
    confirm_selected_questions,
    delete_selected_questions,
    deletion_menu,
    get_reported_content,
    approve_selected,
    delete_selected_answers,
    unverify_selected,
    confirm_selected_answers
} from "./ContentPageButtons"
import{
    addticket,

} from "./ButtonFunctions"
import {
    parseQuestionLink
} from "configs/config"
import {
    getCookie
} from "../../common/CommonFunctions"
import Notify from "../../common/Notifications/Notify"
import {
    Answer,
    Question
} from "../../common/Content"
import Extension from "../../../locales/en/localization.json"
import {
    pageElement,
    pageElementAll
} from "configs/config"

export default new class ModFn{
    buttonArea = document.querySelector("#content-old > div:nth-child(3) > p");

    async confirmDeletion(type: "questions" | "answers") {
        this.buttonArea.querySelector(".mass-actions").insertAdjacentHTML('beforeend', delete_selected_answers())
        
        document.querySelector("#delete  .spinner-container").classList.add("show");
        let checkBoxes = document.getElementsByClassName("contentCheckboxes")
        let checkBoxesArr = Array.from(checkBoxes)
        checkBoxesArr.forEach(element => {
            //@ts-ignore
            if (String(element.checked) === "true") {
                //@ts-ignore
                let link = element.closest("tr").getElementsByTagName('a')[0].href
                let id = parseQuestionLink(link)
                    //@ts-expect-error
                let reason = document.querySelectorAll(".deletion-reason")[0].value
                    //@ts-expect-error
                let warn = document.querySelector("#warn").checked
                    //@ts-expect-error
                let take_point = document.querySelector("#pts").checked;
    
                if(type === "questions"){
                    let givePts = ( < HTMLInputElement > document.querySelector("#res-pts")).checked;
                    let questionObj = new Question()
                    questionObj.Delete(id, reason, warn, take_point, givePts)
                }
                if(type === "answers"){
                    let idsToDelete = []
                    for (let i = 0; i < checkBoxes.length; i++) {
                        //@ts-ignore
                        if (String(checkBoxes[i].checked) === "true") {
                            //@ts-ignore
                            let link = checkBoxes[i].closest("tr").getElementsByTagName('a')[0].href
                            let id = parseQuestionLink(link)
                            idsToDelete.push(id)
                            checkBoxes[i].closest("tr").getElementsByTagName('a')[0].parentElement.parentElement.style.backgroundColor = `#ffc7bf`
                        }
                    }
                    idsToDelete.forEach(async elem => {
                        let questionID = elem
                        let qObj = new Question()
                        let res = await qObj.Get(questionID)
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
                                
                                
                            }
                        }
                    })
                }
                element.closest("tr").style.backgroundColor = `#ffc7bf`
            }
        });
        Notify.Flash(`Selected ${type} removed successfully.`, "success");
        document.querySelector("#delete  .spinner-container").classList.remove("show");
    }
    async approveAnswers() {
        this.buttonArea.querySelector(".mass-actions").insertAdjacentHTML('beforeend', approve_selected())
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
    }
    unverifyAnswers() {
        this.buttonArea.querySelector(".mass-actions").insertAdjacentHTML('beforeend', unverify_selected())
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
    
        let banner = document.createElement('div')
        document.querySelector("#flash-msg").appendChild(banner)
        banner.outerHTML = `<div aria-live="assertive" class="sg-flash" role="alert">
                    <div class="sg-flash__message sg-flash__message--error">
                    <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${success} unapproved, ${fail} had an error. Do you have Super Moderator permissions?</div>
                    </div>
                </div>`
        document.querySelector(".sg-flash").addEventListener("click", function() {
            this.remove();
        })
    
        document.querySelector("#unverify  .spinner-container").classList.remove("show");
    }
    confirmAnswers() {
        this.buttonArea.querySelector(".mass-actions").insertAdjacentHTML('beforeend', confirm_selected_answers())

        document.querySelector("#confirmSelectedAnswers  .spinner-container").classList.add("show");
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
                            let ansObj = await new Answer()
                            ansObj.Confirm(answers[x]["id"])
                        }
                    }
                } else {
                    console.log("Skipped a ticket due to reservation by another mod.")
                }
    
            }
        });
        Notify.Flash("Confirmed selected answers!", "success");
        document.querySelector("#confirmSelectedAnswers  .spinner-container").classList.remove("show");
    
    }
    confirmQuestions() {
        this.buttonArea.querySelector(".mass-actions").insertAdjacentHTML('beforeend', confirm_selected_questions())
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
        idsToConfirm.forEach(async element => {
            let ansObj = new Answer();
            await ansObj.Confirm(element)
        });
    
    
        document.querySelector("#confirmSelectedQuestions  .spinner-container").classList.remove("show");
        window.location.reload();
    }
    async find_reported_content(id, type) {
        this.buttonArea.querySelector(".mass-actions").insertAdjacentHTML('beforeend', get_reported_content())
        const foundReported = []
        let pagenum = document.querySelector("#content-old > div:nth-child(3) > p").children.length - 2;
    
        document.querySelector("#fetchReported  .spinner-container").classList.add("show");
        for (let p = 1; p < pagenum; p++) {
    
    
            let content_page = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/users/user_content/${id}/${type}/${p}/0`, {
                    method: "GET",
                    headers: {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
                    }
                }).then(data => data.text())
                //@ts-ignore
            let responseHTML = new DOMParser().parseFromString(content_page, "text/html")
    
            //@ts-ignore
            if (!responseHTML.querySelector(".border-error")) {
                //@ts-ignore
                let content = responseHTML.querySelector("tbody").children
                var elements = Array.from(content)
                elements.forEach(async element => {
    
                    let contentlink = element
                    let xhr = new XMLHttpRequest();
    
                    xhr.withCredentials = true;
    
                    contentlink.children[1].classList.add("iconcell");
                    let qid = contentlink.querySelector("a").href.replace(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/question/`, "");
    
                    xhr.addEventListener("readystatechange", function() {
                        if (this.readyState === 4) {
                            let resp = JSON.parse(this.responseText);
    
                            if (resp.data.task.settings.is_marked_abuse === true) {
                                let questionData = {
                                    "questionID": resp.data.task.id,
                                    "content": resp.data.task.content,
                                    "timeCreated": resp.data.task.created,
                                    "subject": resp.data.task.subject_id
                                }
                                foundReported.push(questionData)
                            }
    
                            if (type === "responses") {
                                let r = JSON.parse(this.responseText);
                                let userId = window.location.href.replace(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/users/user_content/`, "").split("/")[0]
                                let response = r.data.responses.find(res => String(res.user_id) === String(userId));
    
                                if (response.settings.is_marked_abuse === true) {
                                    let questionData = {
                                        "questionID": r.data.task.id,
                                        "content": response.content,
                                        "timeCreated": response.created,
                                        "subject": r.data.task.subject_id
                                    }
                                    foundReported.push(questionData)
                                }
                            }
                        }
                    });
                    xhr.open("POST", `https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/api_tasks/main_view/${qid}?accept=application/json`);
                    xhr.send();
                });
            }
    
        }
    
        let subjects = [{
            "id": 2,
            "name": "Mathematics"
        }, {
            "id": 5,
            "name": "History"
        }, {
            "id": 1,
            "name": "English"
        }, {
            "id": 8,
            "name": "Biology"
        }, {
            "id": 18,
            "name": "Chemistry"
        }, {
            "id": 15,
            "name": "Physics"
        }, {
            "id": 3,
            "name": "Social Studies"
        }, {
            "id": 31,
            "name": "Advanced Placement (AP)"
        }, {
            "id": 32,
            "name": "SAT"
        }, {
            "id": 7,
            "name": "Geography"
        }, {
            "id": 6,
            "name": "Health"
        }, {
            "id": 21,
            "name": "Arts"
        }, {
            "id": 4,
            "name": "Business"
        }, {
            "id": 19,
            "name": "Computers and Technology"
        }, {
            "id": 29,
            "name": "French"
        }, {
            "id": 30,
            "name": "German"
        }, {
            "id": 28,
            "name": "Spanish"
        }, {
            "id": 22,
            "name": "World Languages"
        }, {
            "id": 33,
            "name": "Medicine"
        }, {
            "id": 34,
            "name": "Law"
        }, {
            "id": 35,
            "name": "Engineering"
        }]
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
}
export function addOnlyChecks() {
    let buttonArea = pageElement("#content-old > div:nth-child(3) > p")
    let content = pageElementAll("#content-old > div:nth-child(2) > div:nth-child(25) > table > tbody > tr")
    document.querySelector("thead tr").insertAdjacentHTML("afterbegin", "<th style = 'width: 5%'></th>")
    for (let i = 0; i < content.length; i++) {
        content[i].children[1].classList.add("iconcell")
        content[i].insertAdjacentHTML('afterbegin', /*html*/ `
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
}