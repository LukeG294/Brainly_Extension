//import { checkUser, checkPermissionSet } from "../common/permission_system"
import Panel from "./Panel"
import Form from "scripts/Items/Form"

//@ts-ignore

async function addPerPage() {
    if(document.querySelector(".modified")) return;
    document.querySelector("#content-old").classList.add("modified");
    let panel = new Panel()
    let permsArr = localStorage.userPerms.split(",")

    //functions for all pages
    //if (permsArr.includes("1") || permsArr.includes("2") || permsArr.includes("3") || permsArr.includes("4")) {
    //    panel.Basic()
    //}

    //tasks page
    if (window.location.href.includes("task") || (!window.location.href.includes("responses") && !window.location.href.includes("comments_tr"))) {
        if (permsArr.includes("2") || permsArr.includes("3") || permsArr.includes("4")) {
            panel.Ques()
        }

    }

    //responses page
    if (window.location.href.includes("responses")) {
        if (permsArr.includes("2") || permsArr.includes("3") || permsArr.includes("4")) {
            panel.Ans()
        }
    }
    const content = []
    Array.from(document.querySelector("tbody").children).forEach(row => {
        let thisRow = {
            content: row.children[1].innerHTML,
            subject: row.children[2].innerHTML,
            date: row.children[3].innerHTML
        }
        content.push(thisRow)
    })
    document.querySelector("table").outerHTML = /*html*/`
    <div class="content"></div>
    `
    console.log(content)
    content.forEach((row, index) => {
        document.querySelector(".content").insertAdjacentHTML("beforeend", /*html*/`
        <div class="content-row">
            ${Form.Checkbox({
                id: `checkbox-${index}`,
                Attributes: [{
                    key: "onclick",
                    value: `document.querySelector('#checkbox-${index}').closest('.content-row').classList.toggle('selected')`
                }]
            }).outerHTML}
            <div class="num">${index + 1}</div>
            <div class="content-text">${row.content}</div>
            <div class="subject">
                <svg
                    class="sg-subject-icon"
                    aria-labelledby="sg-math-symbol-icon-${row.subject.toLowerCase()}-title"
                    role="img"
                    >
                    <text id="sg-math-symbol-icon-${row.subject.toLowerCase()}-title" hidden="">
                        ${row.subject.toLowerCase()}
                    </text>
                    <use xlink:href="#icon-subject-${row.subject.toLowerCase()}" aria-hidden="true"></use>
                </svg>
            </div>
            <div class="date">${row.date}</div>
        </div>
        `)
    })
    //comments page
    if (window.location.href.includes("comments_tr")) {
    }

}

if (localStorage.canUse === "true") {
    const observer = new MutationObserver(addPerPage);
    function addFunctionifFeed(){
        let target = document.querySelector("#content-old > div:nth-child(3)");
        if(!target){ return setTimeout(addFunctionifFeed, 1); }
        
        observer.observe(target, { childList: true, subtree: true});
        console.log("observing")
        addPerPage()
    }
    addFunctionifFeed()
}
