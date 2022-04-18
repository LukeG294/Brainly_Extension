import {get_warnings} from "../common/mod_functions"

let warn_area = /*html*/`
<div class="warnbox">
    <div class="heading">
    <h2 class="sg-headline sg-headline--xlarge sg-headline--extra-bold">Recent Warnings:</h2>
    </div>
    <div class="warnings">

    </div>
</div>
`
function shorten_warnrsn(warning){
    if (warning.includes("plagiarism") || warning.includes("Is that yours?") || warning.includes("Be cool. Be original")){
        warning = "Plagiarism";
    }
    else if(warning.includes("unhelpful answers") || warning.includes("answering just to get the points isn’t cool.") || warning.includes("We love the rebel in you")){
        warning = "SPAM";
    }
    else if(warning.includes("it contained confusing information")){
        warning = "Wrong Information";
    }
    else if(warning.includes("repost the same question over again if that person does not get an answer")){
        warning = "Multiple Posting";
    }
    else if(warning.includes("not part of an academic assignment")){
        warning = "NASP";
    }
    else if(warning.includes("link to a website other than Brainly")){
        warning = "Link in Content";
    }
    else if(warning.includes("contents are not allowed")){
        warning = "#BT Default";
    }
    if(warning.includes("cyberbullying")){
        warning = "Bullying";
    }
    else if(warning.includes("swear words or explicit content.") || warning.includes("swearwords")){
        warning = "Inappropriate Content";
    }
    else if(warning.includes("personal information")){
        warning = "Personal Information";
    }
    else if(warning.includes("not relevant to the question asked") || warning.includes("Please keep in mind that all comments must be on-topic")){
        warning = "Off-topic";
    }
    else if(warning.includes("Brainiac")){
        warning = "IDK Answer";
    }
    else if(warning.includes("Honor Code") || warning.includes("academic dishonesty")){
        warning = "Live Quiz/Exam";
    }
    else if(warning.includes("Community Guidelines") || warning.includes("Please review the terms and thanks for being a team player!")){
        warning = "Default";
    }
    return warning
}
export async function show_recent_warnings(uid){
    let warns = await get_warnings(uid)
    if(warns.length !==0){
        document.querySelector("#main-right").insertAdjacentHTML("beforeend", warn_area)
        for(let i=0; i<warns.length; i++){
            let warn = warns[i];
            let short_rsn = shorten_warnrsn(warn.reason);
            if(warn.isRevoked){
                short_rsn = `<div class = "revoked">${short_rsn}</div>`
            }
            document.querySelector(".warnbox .warnings").insertAdjacentHTML("beforeend", /*html*/`
            <div class="warning">
                <div class="reason sg-headline sg-headline--small sg-headline--extra-bold">${short_rsn}</div>
                <div class="time">${warn.date}</div>
                <div class="mod sg-headline sg-headline--small sg-headline--extra-bold">${warn.moderator}</div>
                <div class="content sg-text sg-text--gray sg-text--small">${warn.content}</div>
            </div>
            `);
        }
        if(warns.length > 3){
            document.querySelector(".warnbox").insertAdjacentHTML("beforeend", `
            <div class = "toggleview">
                <button class="sg-button sg-button--m sg-button--outline warnview"><span class="sg-button__text">show all</span></button>
            </div>
            `)
            document.querySelector(".warnview").addEventListener("click", function(){
                document.querySelector(".warnings").classList.toggle("all");
                if(document.querySelector(".warnings").classList.contains("all")){
                    document.querySelector(".warnview > span").innerHTML = 'show less'
                }
                if(!document.querySelector(".warnings").classList.contains("all")){
                    document.querySelector(".warnview > span").innerHTML = 'show all'
                }
            })
        }
    }
}