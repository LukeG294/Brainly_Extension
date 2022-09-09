import Components from "scripts/Items/Components"
import {
    insert_ticket
} from "../../common/ModFunctions"
import Form from "scripts/Items/Form"

export default new class BasicFn{
    selectAll(elem){
        elem.insertAdjacentElement('beforeend', Components.Button({
            size: "m",
            type: "solid",
            text: "",
            ClassNames: ["select"],
            icon: "check"
        }))
        document.querySelector(".select").addEventListener("click", function(){
            let checkBoxes = document.getElementsByClassName("contentCheckboxes")
            for (let i = 0; i < checkBoxes.length; i++) {
                // @ts-ignore
                checkBoxes[i].querySelector("input").checked = 'true'
                checkBoxes[i].closest(".content-row").classList.add("selected");
            }
        });
    }
    copyLinks(elem) {
        elem.insertAdjacentElement('beforeend', Components.Button({
            size: "m",
            type: "solid",
            text: "",
            ClassNames: ["copy"],
            icon: "clipboard"
        }))
        document.querySelector(".copy").addEventListener("click", function(){
            let checkBoxes = document.getElementsByClassName("sg-checkbox__element")
            let links = []
            for (let i = 0; i < checkBoxes.length; i++) {
                //@ts-ignore
                if (String(checkBoxes[i].querySelector("input").checked) === "true") {
                    links.push(checkBoxes[i].closest(".content-row").getElementsByTagName('a')[0].href)
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
        elem.insertAdjacentElement('beforeend', Components.Button({
            size: "m",
            text: "",
            ClassNames: ["toggle"],
            icon: "filters",
            type: "solid"
        }))
        document.querySelector(".toggle").addEventListener("click", function(){
        let checkBoxes = document.getElementsByClassName("contentCheckboxes")
        for (let i = 0; i < checkBoxes.length; i++) {
            //@ts-ignore
            if (String(checkBoxes[i].querySelector("input").checked) === "true") {
                //@ts-ignore
                checkBoxes[i].querySelector("input").checked = false
                checkBoxes[i].closest(".content-row").classList.remove("selected");
            } else {
                //@ts-ignore
                checkBoxes[i].querySelector("input").checked = true
                checkBoxes[i].closest(".content-row").classList.add("selected");
            }
        }
        })
    }
    addticket() {
        let n_content = document.querySelector(".content");
        for (let i = 0; i < n_content.childElementCount; i++) {
            let row = document.querySelector(".content").children[i];
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
    addIcons() {
        let choice = document.querySelector("#tabs-doj ul")
        let content = document.querySelector(".content-items");
        for (let i = 0; i < content.childElementCount; i++) {
            let xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            let qid = document.querySelector(".content-items").children[i].querySelector("a").href.replace("https://brainly.com/question/", "");

            xhr.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    let resp = JSON.parse(this.responseText);
                    console.log(content.children[i].querySelector(".q-icons"))
        
                    if (resp.data.task.settings.is_marked_abuse === true) {content.children[i].querySelector(".q-icons").classList.add("report")}
                    if (String(resp.data.task.attachments) !== "") {content.children[i].querySelector(".q-icons").classList.add("attach")}

                    if (choice.children[1].classList.value === "active") {
                        //answer page
                        console.log("answer page")
                        let userId = window.location.href.replace("https://brainly.com/users/user_content/", "").split("/")[0]
                        let response = resp.data.responses.find(res => String(res.user_id) === String(userId));

                        if (String(response.attachments) !== "") {content.children[i].querySelector(".a-icons").classList.add("attach")}
                        if (response.approved.approver !== null) {content.children[i].querySelector(".a-icons").classList.add("verified")}
                        if (response.settings.is_marked_abuse === true) {content.children[i].querySelector(".a-icons").classList.add("report")}
                        if (response.best === true) {content.children[i].querySelector(".a-icons").classList.add("best")}
                    }
                    if(content.children[i].querySelector(".a-icons").classList.length > 1 && content.children[i].querySelector(".q-icons").classList.length > 1){
                        content.children[i].querySelector(".content-icons").classList.add("both")
                    }
                    if(content.children[i].querySelector(".a-icons").classList.length > 1){
                        content.children[i].querySelector(".content-icons").classList.add("ans")
                    }
                }
            });
            xhr.open("POST", `https://brainly.com/api/28/api_tasks/main_view/${qid}?accept=application/json`);
            xhr.send();
        }
    }
}