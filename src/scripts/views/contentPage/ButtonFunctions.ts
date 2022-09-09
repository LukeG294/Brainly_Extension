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
import insertDelMenu from "@lib/insertDelMenu"

// export async function showDelrsn(type: "questions" | "answers") {
//     if (document.querySelector(".delmenu").classList.contains("show")) {
//         document.querySelector(".delmenu").classList.remove("show");

//     } else {
//         let stat = new Status("del")
//         //open ticket, get response, close it
//         document.querySelector(".primary-items").innerHTML = '';
//         let id = document.querySelector(".content-row a").getAttribute("href").replace("/question/", "");
//         stat.Show("Fetching Deletion Reasons...", "indigo", true, false)
//         let res = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/moderation_new/get_content`, {
//             method: "POST",
//             body: (`{"model_type_id":1,"model_id":${id},"schema":"moderation.content.get"}`)
//         }).then(data => data.json());
//         stat.Close();
//         document.querySelector(".delmenu").classList.toggle("show");
//         fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/moderate_tickets/expire`, {
//             method: "POST",
//             body: `{"model_id":${id},"model_type_id":1,"schema":"moderation.ticket.expire"}`
//         })
//         let del_reasons;
//         if (type === "questions") {
//             del_reasons = res.data.delete_reasons.task;
//         } else if (type === "answers") {
//             del_reasons = res.data.delete_reasons.response;
//         }

//         //inserting primary deletion reasons

//         document.querySelector(".primary-items").outerHTML = Form.RadioGroup({
//             ClassName: ["primary-items"],
//             id: "primary",
//             items: del_reasons,
//             type: "row",
//             LookFor: {
//                 id: "id",
//                 name: "text"
//             }
//         }).outerHTML

//         //detect selection of primary deletion reason
//         document.querySelector(".primary-items").addEventListener("change", async function() {

//             document.querySelector(".delmenu").classList.add("secondary");
//             let selected_index = document.querySelector(".primary-items input:checked").getAttribute("index");
//             let selected_subcats = del_reasons[selected_index].subcategories;
//             //inserting secondary deletion reasons
//             document.querySelector(".secondary-items").outerHTML = Form.RadioGroup({
//                 ClassName: ["secondary-items"],
//                 id: "secondary",
//                 type: "row",
//                 items: selected_subcats,
//                 LookFor: {
//                     name: "title",
//                     id: "id"
//                 }
//             }).outerHTML
//             //show deletion reason in textarea
//             document.querySelector(".secondary-items").addEventListener("change", function() {
//                 let selected_reason = selected_subcats[document.querySelector(".secondary-items input:checked").getAttribute("index")];
//                 ( < HTMLInputElement > document.querySelector("textarea.deletion-reason")).value = selected_reason.text;
//             });
//         });
//     }
// }
export async function confirmDeletion(type: "questions" | "answers") {
    let counter = 0;
    let stat = new Status("conf")
    stat.Show("Deleting Selected Content...", "indigo", true)
    let checkBoxesArr = Array.from(document.querySelectorAll(".contentCheckboxes input:checked"));
    const chunkSize = 10;
    for (let i = 0; i < checkBoxesArr.length; i += chunkSize) {
        let chunk = checkBoxesArr.slice(i, i + chunkSize);
        console.log(chunk)

        chunk.forEach(async (element) => {
            if ((<HTMLInputElement>element).checked) {
                //@ts-ignore
                let link = element.closest(".content-row").getElementsByTagName('a')[0].href
                let reason = (<HTMLInputElement>document.querySelectorAll(".deletion-reason")[0]).value;
                let warn = (<HTMLInputElement>document.querySelector("#warn")).checked
                let take_point = (<HTMLInputElement>document.querySelector("#pts")).checked;

                let qObj = new Question();

                let id = parseQuestionLink(link)
                element.closest(".content-row").id = id;

                if(type === "questions"){
                    try{
                        let givePts = ( < HTMLInputElement > document.querySelector("#res-pts")).checked;
                        qObj.Delete(id, reason, warn, take_point, givePts)
                        element.closest(".content-row").classList.add("deleted")
                    }catch(e){}
                }
                if(type === "answers"){

                    let res = await qObj.Get(id)
                    //@ts-ignore
                    let answers = res.data.responses
                    let times = 0
                    if (answers.length === 1) {times = 1} else {times = 2}

                    for (let x = 0; x < times; x++) {
                        try{
                            let user = String(answers[x]["user_id"])
                            
                            if (user === String(window.location.href.split("/")[5])) {
                                let ansobj = new Answer();
                                ansobj.Delete(answers[x].id, reason,warn, take_point);
                                element.closest(".content-row").classList.add("deleted")
                            }
                        }catch(e){}
                    }
                }
            }
        })
        //add a 2 second delay between each chunk
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    //task completed
    stat.Close();
    Notify.Flash(`Selected ${type} removed successfully.`, "success");
}