import {insert_ticket} from "../common/mod_functions"

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
export function ModObserver(){
    const observer = new MutationObserver(HomeMod);
    function addFunctionifFeed(){
        let target = document.querySelector(".sg-layout__content");
        if(!target){ return setTimeout(addFunctionifFeed, 100); }
        
        observer.observe(target, { attributes: true, childList: true, subtree: true, characterData:true });
        HomeMod()
    }
    addFunctionifFeed()
}
export function AnsObserver(){
    const observer = new MutationObserver(HomeAns);
    function addFunctionifFeed(){
        let target = document.querySelector(".sg-layout__content");
        if(!target){ return setTimeout(addFunctionifFeed, 100); }
        
        observer.observe(target, { attributes: true, childList: true, subtree: true, characterData:true });
        HomeAns()
    }
    addFunctionifFeed()
}
async function HomeAns(){
    const questions = document.querySelectorAll(".brn-feed-items > div[data-testid = 'feed-item']");
    for (let questionBox of Array.from(questions)) {
        let qid = questionBox.querySelector("a[data-test = 'feed-item-link']").getAttribute("href").replace("/question/","").split("?")[0];
        let actionlist = questionBox.querySelector(".sg-actions-list__hole.sg-actions-list__hole--to-right");
        if(actionlist.id === "altered") continue;
        if(actionlist.querySelector("a") && actionlist.id !== "altered"){
            actionlist.id = "altered"
            actionlist.querySelector("a").innerHTML = '<div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-plus"></use></svg></div>'
        }

        //check if the question has been reported + add the report flag
        let bdata = await fetch("https://brainly.com/api/28/api_tasks/main_view/"+qid, {method: "GET"}).then(data => data.json());
        if(bdata.data.task.settings.is_marked_abuse === true){
            questionBox.querySelector(".brn-feed-item__points .brn-points-on-feed").insertAdjacentHTML("afterbegin",`<div class = "repflag"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-report_flag"></use></svg></div></div>`)
        }
    }
}
export async function HomeMod() {
    const questions = document.querySelectorAll(".brn-feed-items > div[data-testid = 'feed-item']");
    for (let questionBox of Array.from(questions)) {
      let qid = questionBox.querySelector("a[data-test = 'feed-item-link']").getAttribute("href").replace("/question/","").split("?")[0];
      
      //check if the answer button is available
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
      try{
        let actionlist = questionBox.querySelector(".sg-actions-list__hole.sg-actions-list__hole--to-right");
        if (questionBox.querySelector(".mod-button")) continue;
        actionlist.insertAdjacentHTML("afterend", modbutton);
        actionlist.querySelector("a").innerHTML = '<div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-plus"></use></svg></div>'
      }catch(err){
        if(questionBox.id !== "noanswer"){
          questionBox.id = 'noanswer'
          questionBox.querySelector(".brn-feed-item__footer .sg-actions-list").insertAdjacentHTML("afterend", `<div class = "sg-actions-list__hole sg-actions-list__hole--to-right">${modbutton}</div>`);
        }
      }
  
      //check if the question has been reported + add the report flag
      let bdata = await fetch("https://brainly.com/api/28/api_tasks/main_view/"+qid, {method: "GET"}).then(data => data.json());
      if(bdata.data.task.settings.is_marked_abuse === true){
        questionBox.querySelector(".brn-feed-item__points .brn-points-on-feed").insertAdjacentHTML("afterbegin",`<div class = "repflag"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-report_flag"></use></svg></div></div>`)
      }
  
      //mod ticket event listeners
      questionBox.querySelector(".mod-button").addEventListener("click", async function(){
        insert_ticket(qid, questionBox.querySelector(".modticket > .sg-spinner-container__overlay"))
      });
  
      //livemod setup
      //questionBox.querySelector(".brn-feed-item").setAttribute("id", qid);
    }
    //subscribe()
  }