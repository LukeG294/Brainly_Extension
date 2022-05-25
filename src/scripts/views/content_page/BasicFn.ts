import {
    copy_links,
    select_all,
    toggle_selected
} from "./ContentPageButtons"
import {
    insert_ticket
} from "../../common/ModFunctions"

export default new class BasicFn{

    checkboxes(){
        let content = document.querySelectorAll("table > tbody > tr")
        document.querySelector("thead tr").insertAdjacentHTML("afterbegin", "<th style = 'width: 1%'></th>")
        for (let i = 0; i < content.length; i++) {
            content[i].classList.add("modified");
            content[i].children[1].classList.add("iconcell")
            content[i].insertAdjacentHTML('afterbegin', /*html*/ `
        <td class="sg-space-x-m" style = "padding: 0px; padding-left: 8px; text-align:center;">
            <label class="sg-checkbox" for="${i}"><input type="checkbox" class="sg-checkbox__element contentCheckboxes" id="${i}">
            <div class="sg-checkbox__ghost" aria-hidden="true">
            <div class="sg-icon sg-icon--adaptive sg-icon--x16">
                <svg class="sg-icon__svg" role="img" aria-labelledby="title-check-255xyo" focusable="false"><text id="title-check-255xyo" hidden="">check</text>
                <use xlink:href="#icon-check" aria-hidden="true"></use></svg>
            </div>
            </div>
            </label>
        </td>`)}
    }
    selectAll(elem){
        elem.insertAdjacentHTML('beforeend', select_all())
        document.querySelector("#selectAll").addEventListener("click", function(){
            let checkBoxes = document.getElementsByClassName("contentCheckboxes")
            for (let i = 0; i < checkBoxes.length; i++) {
                // @ts-ignore
                checkBoxes[i].checked = 'true'
            }
        });
    }
    copyLinks(elem) {
        elem.insertAdjacentHTML('beforeend', copy_links())
        document.querySelector("#copyLinks").addEventListener("click", function(){
            let checkBoxes = document.getElementsByClassName("sg-checkbox__element")
            let links = []
            for (let i = 0; i < checkBoxes.length; i++) {
                //@ts-ignore
                if (String(checkBoxes[i].checked) === "true") {
                    links.push(checkBoxes[i].closest("tr").getElementsByTagName('a')[0].href)
                }
            }
            let joinLinks = links.join("\n")
            navigator.clipboard.writeText(joinLinks)
                .then(() => {
                    // Success!
                })
                .catch(err => {
                    console.log('Something went wrong', err);
                });
            links = []
        });
    }
    toggleSelection(elem) {
        elem.insertAdjacentHTML('beforeend', toggle_selected())
        document.querySelector("#toggleSelected").addEventListener("click", function(){
        let checkBoxes = document.getElementsByClassName("contentCheckboxes")
        for (let i = 0; i < checkBoxes.length; i++) {
            //@ts-ignore
            if (String(checkBoxes[i].checked) === "true") {
                //@ts-ignore
                checkBoxes[i].checked = false
            } else {
                //@ts-ignore
                checkBoxes[i].checked = true
            }
        }
        })
    }
    addticket() {
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
}