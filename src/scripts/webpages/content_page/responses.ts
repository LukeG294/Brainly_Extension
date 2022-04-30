import { showDelrsn, confirmDeletionAnswers, unverifyAnswers, approveAnswers, confirmAnswers, find_reported_content } from "./button_functions"
import {
    approve_selected,
    delete_selected_answers,
    deletion_menu,
    unverify_selected,
    confirm_selected_answers,
    get_reported_content
} from "./content_page_buttons"

let buttonArea = document.querySelector("#content-old > div:nth-child(3) > p")

export function addResponseButtonsConfirm(){
    buttonArea.insertAdjacentHTML('afterend', confirm_selected_answers())
    document.querySelector("#confirmSelectedAnswers").addEventListener("click",function(){confirmAnswers()})
}
export function addResponseButtonsApprove(){
    buttonArea.insertAdjacentHTML('afterend', approve_selected())
    document.querySelector("#approveSelected").addEventListener("click",function(){approveAnswers()})
}   
export function addResponseButtonsUnverify(){
    buttonArea.insertAdjacentHTML('afterend', unverify_selected())
    document.querySelector("#unverify").addEventListener("click",function(){unverifyAnswers()})
}
export function addResponseButtonsFetchReported(){
    buttonArea.insertAdjacentHTML('afterend', get_reported_content())
    let id = window.location.href.replace("https://brainly.com/users/user_content/","").split("/")[0]
    document.querySelector("#fetchReported").addEventListener("click",async function(){
        await find_reported_content(id,"responses");
    })
}
export function addResponseButtonsDelete(){
    buttonArea.insertAdjacentHTML('afterend', deletion_menu())
    buttonArea.insertAdjacentHTML('afterend', delete_selected_answers())
    document.querySelector("#deleteSelected").addEventListener("click", function(){showDelrsn("answers")})
    document.querySelector("#delete").addEventListener("click",function(){confirmDeletionAnswers()})
}
    
    
    
    
    

 

    


    
    

  
    
    
    
   
    
    
    
    
    


