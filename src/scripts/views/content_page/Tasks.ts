import {
    add_icons,
    confirm_selected_questions,
    delete_selected_questions,
    deletion_menu,
    get_reported_content
} from "./ContentPageButtons"
import {
    showDelrsn,
    confirmDeletionQuestions,
    confirmQuestions,
    find_reported_content
} from "./ButtonFunctions"
import { pageElement, pageElementAll } from "configs/config"

export function addOnlyChecks(){
    let buttonArea = pageElement("#content-old > div:nth-child(3) > p")
    let content = pageElementAll("#content-old > div:nth-child(2) > div:nth-child(25) > table > tbody > tr")
    document.querySelector("thead tr").insertAdjacentHTML("afterbegin", "<th style = 'width: 5%'></th>")
    for (let i = 0; i < content.length; i++) {
        content[i].children[1].classList.add("iconcell")
        content[i].insertAdjacentHTML('afterbegin', /*html*/`
        <td class="sg-space-x-m" style = "padding-left: 8px">
            <label class="sg-checkbox" for="${i}"><input type="checkbox" class="sg-checkbox__element contentCheckboxes" id="${i}">
            <div class="sg-checkbox__ghost" aria-hidden="true">
            <div class="sg-icon sg-icon--adaptive sg-icon--x16">
                <svg class="sg-icon__svg" role="img" aria-labelledby="title-check-255xyo" focusable="false"><text id="title-check-255xyo" hidden="">check</text>
                <use xlink:href="#icon-check" aria-hidden="true"></use></svg>
            </div>
            </div>
            </label>
        </td>
    `)
  }
}
let buttonArea = document.querySelector("#content-old > div:nth-child(3) > p")

export function addTaskButtonsDeletion(){
    buttonArea.insertAdjacentHTML('afterend', deletion_menu())
    buttonArea.insertAdjacentHTML('afterend', delete_selected_questions())
    pageElement("#deleteSelected").addEventListener("click", function(){showDelrsn("questions")})
    pageElement("#delete").addEventListener("click",function(){confirmDeletionQuestions()})
}
export function addTaskButtonsConfirmation(){
    buttonArea.insertAdjacentHTML('afterend', confirm_selected_questions())
    pageElement("#confirmSelectedQuestions").addEventListener("click",function(){confirmQuestions()})
}
export function addTaskButtonsReportedContent(){

    buttonArea.insertAdjacentHTML('afterend', get_reported_content())
    let id = window.location.href.replace("https://brainly.com/users/user_content/","").split("/")[0]
    pageElement("#fetchReported").addEventListener("click", async function(){
        await find_reported_content(id,"tasks");
        add_icons()
    })
}