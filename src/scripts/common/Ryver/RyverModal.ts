
import {runtime} from "webextension-polyfill"

import Extension from "../../../locales/en/localization.json"

export function login_form(){
    return(/*html*/`
        <div class="sg-flex">
        <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div></div>
        <h1 class="sg-text-bit sg-text-bit--mint-primary">${Extension.ryver.ryverLogin}</h1>
            <div class="sg-flex sg-flex--column sg-flex--margin-right-l">
                <input type="text" placeholder="${Extension.ryver.username}" class="sg-input username">
                <input type="text" placeholder="${Extension.ryver.password}" class="sg-input password">
            </div>
            <button class="sg-button sg-button--m sg-button--outline check-user"><span class="sg-button__text">${Extension.ryver.login}</span></button>
        </div>
    `)
}
export function ryver_notification(){
    return(/*html*/`
    <div class="ryv-notif">
        <div class = "notif_close">
            <div class="sg-icon sg-icon--dark sg-icon--x32">
                <svg class="sg-icon__svg"><use xlink:href="#icon-close"></use></svg>
            </div>
        </div>
        <img src="${runtime.getURL("resources/Compositions/Learners_group.svg")}" alt="">
        <h1 class="sg-text-bit sg-text-bit--mint-primary">${Extension.ryver.ryverLogin}</h1>
    </div>
    `)
}