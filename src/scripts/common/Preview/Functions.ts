import BrainlyAPI from "../BrainlyAPI"
import Extension from "../../../locales/en/localization.json"
import {Preview} from "./HTML"
import {get_time_diff} from "../CommonFunctions"
import {add_attachments} from "../Mod Ticket/ticket_functions"

export async function AddContent(id){
    let basic_data = await BrainlyAPI.GetQuestion(id)
    let d_reference = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/api_config/desktop_view`, {method: "GET"}).then(data => data.json());
    console.log(basic_data)
    console.log(d_reference)
    let question = basic_data.data.task
    let asker = basic_data.users_data.find(({id}) => id === question.user_id);

    document.querySelector("body").insertAdjacentHTML("afterbegin", 
    Preview(
        question.content,
        get_time_diff(question.created),
        d_reference.data.subjects.find(({id})=> id === question.grade_id).name,
        d_reference.data.grades.find(({id})=> id === question.subject_id).name,
        question.points.ptsForResp,
        asker.avatar ? `<img src = "${asker.avatar[64]}"/>`:`<div class="sg-avatar"><div class="sg-avatar__image sg-avatar__image--icon"><div class="sg-icon sg-icon--gray-light sg-icon--x32 sg-avatar__icon"><svg class="sg-icon__svg"><use xlink:href="#icon-profile"></use></svg></div></div></div>`,
        asker.nick,
        asker.ranks
    ))
    add_attachments(question, document.querySelector(".content-item.question"))
}