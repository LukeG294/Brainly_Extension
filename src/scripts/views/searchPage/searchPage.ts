import { insert_ticket, runCheck } from "../../common/ModFunctions";
import Form from "scripts/Items/Form"
import insertDelMenu from "@lib/insertDelMenu";
import { extension_server_url, parseQuestionLink } from "configs/config";
import Components from "scripts/Items/Components"
import Notify from "../../common/Notifications/Notify"
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
        if(!target){ return setTimeout(addFunctionifFeed, 500); }
        
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
    let i = 0
    for (let questionBox of Array.from(questions)) {
      i+=1
      let qid = questionBox.querySelector(".sg-text--link-unstyled").getAttribute("href").replace("/question/","").split("?")[0];
      if (!questionBox.querySelector(".append")){
        
        questionBox.querySelector(".sg-rate-box").insertAdjacentHTML("afterend", `<div class = "sg-actions-list__hole sg-actions-list__hole--to-right append">${modbutton}</div>`);
        questionBox.insertAdjacentHTML("beforeend", /*html*/`
            ${Form.Checkbox({
            id: `checkbox-${i}`,
            classes: ["contentCheckboxes"],
           
        }).outerHTML
        }`)
        questionBox.querySelector(".mod-button").addEventListener("click", async function(){
            insert_ticket(qid, questionBox.querySelector(".modticket > .sg-spinner-container__overlay"))
          });
         
          
      }
       
      
    }
    
    let elem = document.getElementById("main-content")
    if (!elem.querySelector(".mdelete")){
        elem.insertAdjacentElement("beforeend", Components.Button({
            type: "solid",
            size: "m",
            text: "Delete",
            ClassNames: ["mdelete"],
            icon: "trash",
            onClick: () => {
              document.querySelector(".mdelete").classList.add("shower")
              if (document.querySelector(".afcmenu") !== null){
                document.querySelector(".afcmenu").remove()
              }
              
              insertDelMenu(
                document.getElementById("main-content") ,
                "tasks",
                () => {
                 
                    return Array.from(document.querySelectorAll(".contentCheckboxes input:checked")).map(el => {
                      return parseQuestionLink(el.closest("[data-testid = search-item-facade-wrapper]").querySelector("a").href)
                    })
                  
                },
                () => {
                  return Array.from(document.querySelectorAll(".contentCheckboxes input")).map(el => {
                    return parseQuestionLink(el.closest("[data-testid = search-item-facade-wrapper]").querySelector("a").href)
                  })
                },
                true,
                (element) => {
                    
                   document.querySelector(`a[href = "/question/${element}?referrer=searchResults"]`).parentElement.classList.add("deleted")
                 
                }
                
              )
              
              document.querySelector(".mdelete").classList.remove("shower")
            }
            
          }));
    }
    if (!elem.querySelector(".mtoggle")){
      elem.insertAdjacentElement("beforeend", Components.Button({
          type: "solid",
          size: "m",
          text: "Toggle Selected",
          ClassNames: ["mtoggle"],
          icon: "filters",
          onClick: () => {
            document.querySelectorAll(".contentCheckboxes input").forEach(element => {
              //@ts-ignore
              if (!element.checked){element.checked = true} else {element.checked = false}
            });
            
          }
          
        }));
    }
    if (!elem.querySelector(".mcopy")){
      elem.insertAdjacentElement("beforeend", Components.Button({
          type: "solid",
          size: "m",
          text: "Copy Selected",
          ClassNames: ["mcopy"],
          icon: "clipboard",
          onClick: () => {
            let links = []
            document.querySelectorAll(".contentCheckboxes input").forEach(element => {
              //@ts-ignore
              if (element.checked){
                links.push(element.closest("[data-testid = search-item-facade-wrapper]").querySelector("a").href.replace("?referrer=searchResults",""))
              }
            });
            let joinLinks = links.join("\n")
            navigator.clipboard.writeText(joinLinks)
                .then(() => {
                    // Success!
                })
                .catch(err => {
                    console.log('Something went wrong', err);
                });
                if (links.length > 0){
                    Notify.Flash("Copied links to clipboard!", "success")
                }
            links = []
          }
          
        }));
    }
    
}
async function init(){
    let key = await fetch(`${extension_server_url()}/configs/feature_keys`).then(data => data.json())
    runCheck(SearchObserver, key["search_page_mass_mod"])
}

init()