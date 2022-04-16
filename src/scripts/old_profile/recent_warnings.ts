import {get_warnings} from "../common/mod_functions"

let warn_area = /*html*/`
<div class="warnbox">
    <div class="heading">
        
    </div>
    <div class="warnings">

    </div>
</div>
`
export async function show_recent_warnings(uid){
    let warns = await get_warnings(uid)
    document.querySelector("#main-right").insertAdjacentHTML("afterbegin", warn_area)
    for(let i=0; i<warns.length; i++){
        let warn = warns[i]
        document.querySelector(".warnbox .warnings").insertAdjacentHTML("beforeend", /*html*/`
        <div class="warning">
            <div class="reason">${warn.reason}</div>
            <div class="time">${warn.date}</div>
            <div class="mod">${warn.moderator}</div>
            <div class="content">${warn.content}</div>
        </div>
        `)
    }
}