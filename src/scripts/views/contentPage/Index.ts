//import { checkUser, checkPermissionSet } from "../common/permission_system"
import Panel from "./Panel"
import { RenderItems } from "./ContentPageButtons"

async function addPerPage() {
    if(document.querySelector(".modified")) return;
    document.querySelector("#content-old").classList.add("modified");
    let panel = new Panel()
   

    //functions for all pages
    
        panel.Basic()
    
    //tasks page
    if (window.location.href.includes("task") || (!window.location.href.includes("responses") && !window.location.href.includes("comments_tr"))) {
        panel.Ques()

    }

    //responses page
    if (window.location.href.includes("responses")) {
        
        panel.Ans()
        
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
    <div class="content-items"></div>
    `
    RenderItems(content)
    
    //comments page
    if (window.location.href.includes("comments_tr")) {
    }

}


    const observer = new MutationObserver(addPerPage);
    function addFunctionifFeed(){
        let target = document.querySelector("#content-old > div:nth-child(3)");
        if(!target){ return setTimeout(addFunctionifFeed, 1); }
        
        observer.observe(target, { childList: true, subtree: true});
        addPerPage()
    }
    addFunctionifFeed()

