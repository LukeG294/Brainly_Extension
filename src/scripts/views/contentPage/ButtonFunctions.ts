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