import {
    insert_ticket
} from "../../common/ModFunctions"
import {
    add_icons,
    copy_links,
    select_all,
    toggle_selected
} from "./ContentPageButtons"
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

export async function showDelrsn(type: string) {
    if (document.querySelector(".delmenu").classList.contains("show")) {
        document.querySelector(".delmenu").classList.remove("show");

    } else {
        //open ticket, get response, close it
        document.querySelector(".primary-items").innerHTML = '';
        let id = document.querySelector("tbody a").getAttribute("href").replace("/question/", "");
        document.querySelector("#deleteSelected .spinner-container").classList.add("show");
        let res = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/moderation_new/get_content`, {
            method: "POST",
            body: (`{"model_type_id":1,"model_id":${id},"schema":"moderation.content.get"}`)
        }).then(data => data.json());
        document.querySelector("#deleteSelected .spinner-container").classList.remove("show");
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
        console.log(JSON.stringify(res.data.delete_reasons))

        //inserting primary deletion reasons

        for (let i = 0; i < del_reasons.length; i++) {
            document.querySelector(".primary-items").insertAdjacentHTML("beforeend", /*html*/ `
        <label class="sg-radio sg-radio--xxs" for="r${del_reasons[i].id}">
          <input type="radio" class="sg-radio__element" name="group1" id="r${del_reasons[i].id}" index = "${i}">
          <span class="sg-radio__ghost" aria-hidden="true"></span>
          <span class="sg-text sg-text--small sg-text--bold sg-radio__label">${del_reasons[i].text}</span>
        </label>`)
        }

        //detect selection of primary deletion reason
        document.querySelector(".primary-items").addEventListener("change", async function() {

            document.querySelector(".delmenu").classList.add("secondary");
            let selected_index = document.querySelector(".primary-items input:checked").getAttribute("index");
            let selected_subcats = del_reasons[selected_index].subcategories;
            console.log(selected_subcats);
            document.querySelector(".secondary-items").innerHTML = '';
            //inserting secondary deletion reasons
            for (let i = 0; i < selected_subcats.length; i++) {
                document.querySelector(".secondary-items").insertAdjacentHTML("beforeend", /*html*/ `
          <label class="sg-radio sg-radio--xxs" for="s${selected_subcats[i].id}">
            <input type="radio" class="sg-radio__element" name="group2" id="s${selected_subcats[i].id}" index = "${i}">
            <span class="sg-radio__ghost" aria-hidden="true"></span>
            <span class="sg-text sg-text--small sg-text--bold sg-radio__label">${selected_subcats[i].title}</span>
          </label>`)
            }
            //show deletion reason in textarea
            document.querySelector(".secondary-items").addEventListener("change", function() {
                let selected_reason = selected_subcats[document.querySelector(".secondary-items input:checked").getAttribute("index")]
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
