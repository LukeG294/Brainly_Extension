import {ryver_notification} from "../common/Ryver/ryver_modal"
import {login_run} from "../common/Ryver/ryver_login"
import {show_ticket} from "../common/mod_functions"
import {subscribe, setAuth} from "./livemod"
import {add_admin} from "./homepage_admin"

async function HomepageButtons() {
  setAuth()
  const questions = document.querySelectorAll(".brn-feed-items > div[data-testid = 'feed-item']");
  for (let questionBox of Array.from(questions)) {
    let qid = questionBox.querySelector("a[data-test = 'feed-item-link']").getAttribute("href").replace("/question/","").split("?")[0];
    
    //check if the answer button is available
    try{
      let actionlist = questionBox.querySelector(".sg-actions-list__hole.sg-actions-list__hole--to-right");
      if (questionBox.querySelector(".mod-button")) continue;
      actionlist.insertAdjacentHTML("afterend", `<button class="mod-button sg-button--outline"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-shield"></use></svg></div></button>`);
      actionlist.querySelector("a").innerHTML = '<div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-plus"></use></svg></div>'
    }catch(err){
      if(questionBox.id !== "noanswer"){
      questionBox.id = 'noanswer'
      questionBox.querySelector(".brn-feed-item__footer .sg-actions-list").insertAdjacentHTML("afterend", `<div class = "sg-actions-list__hole sg-actions-list__hole--to-right"><button class="mod-button sg-button--outline"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-shield"></use></svg></div></button></div>`);
      }
    }

    //check if the question has been reported + add the report flag
    let bdata = await fetch("https://brainly.com/api/28/api_tasks/main_view/"+qid, {method: "GET"}).then(data => data.json());
    if(bdata.data.task.settings.is_marked_abuse === true){
      questionBox.querySelector(".brn-feed-item__points .brn-points-on-feed").insertAdjacentHTML("afterbegin",`<div class = "repflag"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-report_flag"></use></svg></div></div>`)
    }

    //mod ticket event listeners
    questionBox.querySelector(" .mod-button").addEventListener("click", async function(){
      show_ticket(qid)
    });
    //livemod call
    questionBox.querySelector(".brn-feed-item").setAttribute("task-id", qid);
    subscribe()
  }
}
  
const observer = new MutationObserver(HomepageButtons);
const addObserverIfFeedAvailable = () => {
  let target = document.querySelector(".sg-layout__content");
  if(!target) return setTimeout(addObserverIfFeedAvailable, 500);
  
  observer.observe(target, { attributes: true, childList: true, characterData: true, subtree: true });
  HomepageButtons();
};
addObserverIfFeedAvailable();
//if user does not have username and password in local storage
if(!localStorage.getItem("userAuth")){
  window.addEventListener("load", function(){
  document.querySelector("body").insertAdjacentHTML("afterbegin", ryver_notification())
  login_run();
})
}