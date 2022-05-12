import { showDelrsn, confirmDeletionAnswers, unverifyAnswers, approveAnswers, confirmAnswers, find_reported_content } from "./ButtonFunctions"
import {
    approve_selected,
    delete_selected_answers,
    deletion_menu,
    unverify_selected,
    confirm_selected_answers,
    get_reported_content
} from "./ContentPageButtons"
import Extension from "../../../locales/en/localization.json"

let buttonArea = document.querySelector("#content-old > div:nth-child(3) > p")

export function addResponseButtonsConfirm(){
    buttonArea.querySelector(".mass-actions").insertAdjacentHTML('beforeend', confirm_selected_answers())
    document.querySelector("#confirmSelectedAnswers").addEventListener("click",function(){confirmAnswers()})
}
export function addResponseButtonsApprove(){
    buttonArea.querySelector(".mass-actions").insertAdjacentHTML('beforeend', approve_selected())
    document.querySelector("#approveSelected").addEventListener("click",function(){approveAnswers()})
}   
export function addResponseButtonsUnverify(){
    buttonArea.querySelector(".mass-actions").insertAdjacentHTML('beforeend', unverify_selected())
    document.querySelector("#unverify").addEventListener("click",function(){unverifyAnswers()})
}
export function addResponseButtonsFetchReported(){
    buttonArea.querySelector(".mass-actions").insertAdjacentHTML('beforeend', get_reported_content())
    let id = window.location.href.replace(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/users/user_content/`,"").split("/")[0]
    document.querySelector("#fetchReported").addEventListener("click",async function(){
        await find_reported_content(id,"responses");
    })
}
export function addResponseButtonsDelete(){
    buttonArea.insertAdjacentHTML('afterend', deletion_menu())
    buttonArea.querySelector(".mass-actions").insertAdjacentHTML('beforeend', delete_selected_answers())
    document.querySelector("#deleteSelected").addEventListener("click", function(){showDelrsn("answers")})
    document.querySelector("#delete").addEventListener("click",function(){confirmDeletionAnswers()})
}
    
    
    
    
    

 

    


    
    

  
    
    
    
   
    
    
    
    
    


