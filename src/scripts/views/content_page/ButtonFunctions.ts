import {
    insert_ticket
} from "../../common/ModFunctions"
import {
    parseQuestionLink
} from "configs/config"
import Notify from "../../common/Notifications/Notify"
import {
    Answer, Question
} from "../../common/Content"
import Status from "scripts/common/Notifications/Status"
import Form from "scripts/Items/Form"
import Extension from "../../../locales/en/localization.json"

export async function showDelrsn(type: "questions" | "answers") {
    if (document.querySelector(".delmenu").classList.contains("show")) {
        document.querySelector(".delmenu").classList.remove("show");

    } else {
        let stat = new Status("del")
        //open ticket, get response, close it
        document.querySelector(".primary-items").innerHTML = '';
        let id = document.querySelector(".content-row a").getAttribute("href").replace("/question/", "");
        stat.Show("Fetching Deletion Reasons...", "indigo", true, false)
        let res = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/moderation_new/get_content`, {
            method: "POST",
            body: (`{"model_type_id":1,"model_id":${id},"schema":"moderation.content.get"}`)
        }).then(data => data.json());
        stat.Close();
        document.querySelector(".delmenu").classList.toggle("show");
        fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/moderate_tickets/expire`, {
            method: "POST",
            body: `{"model_id":${id},"model_type_id":1,"schema":"moderation.ticket.expire"}`
        })
        let del_reasons;
        if (type === "questions") {
            del_reasons = res.data.delete_reasons.task;
        } else if (type === "answers") {
            del_reasons = res.data.delete_reasons.response;
        }
        console.log(res.data.delete_reasons)

        //inserting primary deletion reasons

        document.querySelector(".primary-items").outerHTML = Form.RadioGroup({
            ClassName: ["primary-items"],
            id: "primary",
            items: del_reasons,
            type: "row",
            LookFor: {
                id: "id",
                name: "text"
            }
        }).outerHTML

        //detect selection of primary deletion reason
        document.querySelector(".primary-items").addEventListener("change", async function() {

            document.querySelector(".delmenu").classList.add("secondary");
            let selected_index = document.querySelector(".primary-items input:checked").getAttribute("value");
            let selected_subcats = del_reasons[selected_index].subcategories;
            console.log(selected_subcats);
            //inserting secondary deletion reasons
            document.querySelector(".secondary-items").outerHTML = Form.RadioGroup({
                ClassName: ["secondary-items"],
                id: "secondary",
                type: "row",
                items: selected_subcats,
                LookFor: {
                    name: "title",
                    id: "id"
                }
            }).outerHTML
            //show deletion reason in textarea
            document.querySelector(".secondary-items").addEventListener("change", function() {
                let selected_reason = selected_subcats[document.querySelector(".secondary-items input:checked").getAttribute("value")]
                console.log(selected_reason);
                ( < HTMLInputElement > document.querySelector("textarea.deletion-reason")).value = selected_reason.text;
            });
        });
    }
}
export function addticket() {
    let n_content = document.querySelector("tbody");
    for (let i = 0; i < n_content.childElementCount; i++) {
        let row = document.querySelector("tbody").children[i];
        let cell = row.children[1];
        let qid = row.querySelector("a").getAttribute("href").replace("/question/", "");
        cell.insertAdjacentHTML("afterbegin", /*html*/ `
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
        row.querySelector(".contenticon.shield").addEventListener("click", function() {
            insert_ticket(qid, row.querySelector(".modticket > .sg-spinner-container__overlay"));
        });
    }
}
export async function confirmDeletion(type: "questions" | "answers") {
    
    let stat = new Status("conf")
    stat.Show("Deleting Selected Content...", "indigo", true)
    let checkBoxes = document.getElementsByClassName("contentCheckboxes");
    let checkBoxesArr = Array.from(checkBoxes)
    const idsToDelete = []

    checkBoxesArr.forEach(async element => {
        element = element.querySelector("input")
        //@ts-ignore
        if (element.checked) {
            //@ts-ignore
            let link = element.closest(".content-row").getElementsByTagName('a')[0].href
            let reason = (<HTMLInputElement>document.querySelectorAll(".deletion-reason")[0]).value;
            let warn = (<HTMLInputElement>document.querySelector("#warn")).checked
            let take_point = (<HTMLInputElement>document.querySelector("#pts")).checked;

            let qObj = new Question();

            let id = parseQuestionLink(link)
            element.closest(".content-row").id = id;

            if(type === "questions"){
                let givePts = ( < HTMLInputElement > document.querySelector("#res-pts")).checked;
                idsToDelete.push(id);
                await qObj.Delete(id, reason, warn, take_point, givePts)
                element.closest(".content-row").classList.add("deleted")
            }
            if(type === "answers"){

                let res = await qObj.Get(id)
                //@ts-ignore
                let answers = res.data.responses
                let times = 0

                if (answers.length === 1) {
                    times = 1
                } else {
                    times = 2
                }
                let a = answers.find(({id}) => id === parseInt(window.location.href.split("/")[5]));
                console.log("answer", a);
                for (let x = 0; x < times; x++) {
                    let user = String(answers[x]["user_id"])
                    if (user === String(window.location.href.split("/")[5])) {
                        idsToDelete.push(answers[x].id)
                        let ansobj = new Answer();
                        await ansobj.Delete(answers[x].id, reason,warn, take_point);
                        element.closest(".content-row").classList.add("deleted")
                        
                    }
                }
            }
        }
    });
    Notify.Flash(`Selected ${type} removed successfully.`, "success");
    stat.Close();
}