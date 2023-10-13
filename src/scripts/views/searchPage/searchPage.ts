import { insert_ticket } from "../../common/ModFunctions";

let modbutton = /*html*/`
        <div class="modticket">
            <div class="sg-spinner-container__overlay">
            <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
            </div>
            <button class="mod-button sg-button--outline">
            <div class="sg-icon sg-icon--dark sg-icon--x32">
                <svg class="sg-icon__svg"><use xlink:href="#icon-shield"></use></svg>
            </div>
            </button>
        </div>
        `
let added = false
export async function SearchObserver(){

    const observer = new MutationObserver(searchMod);
    function addFunctionifFeed(){
        let target = document.querySelector(".sg-layout__content");
        if(!target){ return setTimeout(addFunctionifFeed, 5000); }
        
        observer.observe(target, { attributes: true, childList: true, subtree: true, characterData:true });
        if (added === false){
            searchMod()
            added = true
        }
        
    }
    addFunctionifFeed()
}

export async function searchMod(){
    
    const questions = document.querySelectorAll("[data-testid = search-item-facade-wrapper]")
   
    for (let questionBox of Array.from(questions)) {
      
        
      if (!questionBox.querySelector(".append")){
        let qid = questionBox.querySelector(".sg-text--link-unstyled").getAttribute("href").replace("/question/","").split("?")[0];
        questionBox.querySelector(".sg-rate-box").insertAdjacentHTML("afterend", `<div class = "sg-actions-list__hole sg-actions-list__hole--to-right append">${modbutton}</div>`);
        questionBox.querySelector(".mod-button").addEventListener("click", async function(){
            insert_ticket(qid, questionBox.querySelector(".modticket > .sg-spinner-container__overlay"))
          });
    }
      
    }
}

SearchObserver()