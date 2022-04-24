import { selectAll, toggleSelection, copyLinks, showDelrsn, confirmDeletionAnswers, unverifyAnswers, approveAnswers, confirmAnswers, find_reported_content } from "./button_functions"
import {
    approve_selected,
    copy_links,
    delete_selected_answers,
    deletion_menu,
    select_all,
    toggle_selected,
    unverify_selected,
    add_icons,
    confirm_selected_answers,
    get_reported_content
} from "./content_page_buttons"
import { getPermissions } from "../common/permission_system"

export function addResponseButtons(){
    add_icons();
    let content = document.querySelectorAll("#content-old > div:nth-child(2) > div:nth-child(25) > table > tbody > tr")

    for (let i = 0; i < content.length; i++) {
        content[i].insertAdjacentHTML('beforeend', `<div class="sg-space-x-m"><label class="sg-checkbox" for="mmm41eh8ef8"><input type="checkbox" class="sg-checkbox__element contentCheckboxes" id="${i}">
     <div class="sg-checkbox__ghost" aria-hidden="true">
       <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg" role="img" aria-labelledby="title-check-255xyo" focusable="false"><text id="title-check-255xyo" hidden="">check</text>
           <use xlink:href="#icon-check" aria-hidden="true"></use>
         </svg></div>
     </div>
        </label></div>`)
    }

    let buttonArea = document.querySelector("#content-old > div:nth-child(3) > p")
        //if you want to add permissions for each button later, do it here (below)
    let url = String(window.location.href)


    async function checkPermissionSet(){
        let permissionSet = await getPermissions()
        if (permissionSet >= 5){
            
            buttonArea.insertAdjacentHTML('afterend', confirm_selected_answers())
            buttonArea.insertAdjacentHTML('afterend', approve_selected())
            
            
            buttonArea.insertAdjacentHTML('afterend', get_reported_content())
            document.querySelector("#fetchReported").addEventListener("click",async function(){
                await find_reported_content(id,"responses");
               
            })
            document.querySelector("#approveSelected").addEventListener("click",function(){approveAnswers()})
            document.querySelector("#confirmSelectedAnswers").addEventListener("click",function(){confirmAnswers()})
        
        } 
        if (permissionSet >= 6){
            buttonArea.insertAdjacentHTML('afterend', unverify_selected())
            document.querySelector("#unverify").addEventListener("click",function(){unverifyAnswers()})
        }
        if (permissionSet >= 4){
            buttonArea.insertAdjacentHTML('afterend', copy_links())
            buttonArea.insertAdjacentHTML('afterend', toggle_selected())
            buttonArea.insertAdjacentHTML('afterend', select_all())
            buttonArea.insertAdjacentHTML('afterend', deletion_menu())
            buttonArea.insertAdjacentHTML('afterend', delete_selected_answers())
            document.querySelector("#deleteSelected").addEventListener("click", function(){showDelrsn("answers")})
            document.querySelector("#delete").addEventListener("click",function(){confirmDeletionAnswers()})
            document.getElementById("selectAll").addEventListener("click", function(){selectAll()})
            document.getElementById("toggleSelected").addEventListener("click", function(){toggleSelection()})
            document.getElementById("copyLinks").addEventListener("click", function(){copyLinks()})
        }
    }
    checkPermissionSet()
    
    
    
    
   
    
    
    
    let id = window.location.href.replace("https://brainly.com/users/user_content/","").split("/")[0]
    
}

