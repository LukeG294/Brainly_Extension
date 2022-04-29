import {
    add_icons,
    confirm_selected_questions,
    copy_links,
    delete_selected_questions,
    deletion_menu,
    get_reported_content,
    select_all,
    toggle_selected
} from "./content_page_buttons"
import {
    selectAll, 
    copyLinks,
    toggleSelection,
    showDelrsn,
    confirmDeletionQuestions,
    confirmQuestions,
    find_reported_content,
} from "./button_functions"

export function addOnlyChecks(){
    let content = document.querySelectorAll("#content-old > div:nth-child(2) > div:nth-child(25) > table > tbody > tr")
    for (let i = 0; i < content.length; i++) {
        content[i].insertAdjacentHTML('beforeend', `
        <div class="sg-space-x-m"><label class="sg-checkbox" for="mmm41eh8ef8"><input type="checkbox" class="sg-checkbox__element contentCheckboxes" id="${i}">
            <div class="sg-checkbox__ghost" aria-hidden="true">
            <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg" role="img" aria-labelledby="title-check-255xyo" focusable="false"><text id="title-check-255xyo" hidden="">check</text>
                <use xlink:href="#icon-check" aria-hidden="true"></use>
                </svg>
            </div>
        </div>
        </label></div>
        
    `)
    
    }
   
}
let buttonArea = document.querySelector("#content-old > div:nth-child(3) > p")
export function addTaskButtonsBasic(){
   
    let content = document.querySelectorAll("#content-old > div:nth-child(2) > div:nth-child(25) > table > tbody > tr")
    for (let i = 0; i < content.length; i++) {
        content[i].children[1].classList.add("iconcell")
        content[i].insertAdjacentHTML('beforeend', `
        <div class="sg-space-x-m"><label class="sg-checkbox" for="mmm41eh8ef8"><input type="checkbox" class="sg-checkbox__element contentCheckboxes" id="${i}">
            <div class="sg-checkbox__ghost" aria-hidden="true">
            <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg" role="img" aria-labelledby="title-check-255xyo" focusable="false"><text id="title-check-255xyo" hidden="">check</text>
                <use xlink:href="#icon-check" aria-hidden="true"></use>
                </svg>
            </div>
        </div>
        </label></div>
        
    `)
    
    }
   
   
    

      
            
                buttonArea.insertAdjacentHTML('afterend', copy_links())
                buttonArea.insertAdjacentHTML('afterend', toggle_selected())
                buttonArea.insertAdjacentHTML('afterend', select_all())
                document.getElementById("selectAll").addEventListener("click", function(){selectAll()})
                document.getElementById("toggleSelected").addEventListener("click", function(){toggleSelection()})
                document.getElementById("copyLinks").addEventListener("click", function(){copyLinks()})
              
                
               
               

            
        }



export function addTaskButtonsDeletion(){
    buttonArea.insertAdjacentHTML('afterend', deletion_menu())
    buttonArea.insertAdjacentHTML('afterend', delete_selected_questions())
    document.querySelector("#deleteSelected").addEventListener("click", function(){showDelrsn("questions")})
    document.querySelector("#delete").addEventListener("click",function(){confirmDeletionQuestions()})

    
   
}

export function addTaskButtonsConfirmation(){
    buttonArea.insertAdjacentHTML('afterend', confirm_selected_questions())
    document.querySelector("#confirmSelectedQuestions").addEventListener("click",function(){confirmQuestions()})
    
}

export function addTaskButtonsReportedContent(){

    buttonArea.insertAdjacentHTML('afterend', get_reported_content())
    let id = window.location.href.replace("https://brainly.com/users/user_content/","").split("/")[0]
    document.querySelector("#fetchReported").addEventListener("click", async function(){
        await find_reported_content(id,"tasks");
        add_icons()
    })
}
