import BrainlyAPI from "../../common/BrainlyAPI";
import Component from "scripts/Items/Components";
import Form from "scripts/Items/Form";
import Status from "../../common/Notifications/Status"
import Preview from "../../common/Preview/Index";
import {insert_ticket, noclick} from "../../common/ModFunctions"

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
    function userSearchIfPanel(){
      let target = document.querySelector(".brn-moderation-panel__content");
      if(!target){ return setTimeout(userSearchIfPanel, 100); }
      
      observer.observe(target, { attributes: true, childList: true, subtree: true, characterData:true });
      UserSearchTool()
  }
  userSearchIfPanel()
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
export async function repMenu(qid:string, element){
  let subcatId;
  let selectedRsn;
  document.body.insertAdjacentHTML("beforeend", /*html*/`
  <div class = "backdrop">
    <div class="repmenu">
      <div class="sg-spinner-container__overlay">
        <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
      </div>
      ${
        Component.Button({
          size:"m",
          type: "solid",
          icon: "close",
          iconSize: "24",
          ClassNames: ["close"],
          Attributes: [{
            key: "onclick",
            value: "document.querySelector('.backdrop').remove()"
          }]
        }).outerHTML
      }
      ${
        Component.Button({
          size: "m",
          type: "solid",
          ClassNames: ["cont-report"],
          text: "send",
        }).outerHTML
      }
    </div>
  </div>
    `
  )
  let reasons = await fetch('https://brainly.com/api/28/moderation_new/get_abuse_reasons', {
    method: 'POST',
    body: JSON.stringify({
      model_id: qid,
      model_type_id: 1
    })
  }).then(data => data.json())
  document.querySelector(".repmenu").classList.add("loaded")
  document.querySelector(".repmenu").insertAdjacentElement("afterbegin", 
    Form.RadioGroup({
      ClassName: ["rep-items"],
      type: "column",
      id: "rep-items",
      LookFor: {
         id: "id",
         name: "text",
      },
      items: reasons.data
    })
  )
  document.querySelector(".rep-items").addEventListener("change", () => {
    try{
      if(!document.querySelector(".rep-items input:checked").closest(".sg-radio").querySelector(".rep-sub-items")){
        document.querySelector(".rep-sub-items").remove();
      }
    }catch(e){}
    selectedRsn = reasons.data[parseInt(document.querySelector(".rep-items input:checked").getAttribute("value"))];
    let subcatElem = document.querySelector(".rep-items input:checked").closest(".sg-radio").querySelector(".rep-sub-items");

    if(selectedRsn.subcategories && !subcatElem){
      document.querySelector(".rep-items input:checked").closest(".sg-radio").insertAdjacentElement("beforeend",
        Form.RadioGroup({
          ClassName: ["rep-sub-items"],
          type: "column",
          id: "rep-sub-items",
          defCheck: "0",
          LookFor: {
            id: "id",
            name: "text"
          },
          items: selectedRsn.subcategories
        })
      );
      subcatId = selectedRsn.subcategories[parseInt(document.querySelector(".rep-sub-items input:checked").getAttribute("value"))].id
      
      document.querySelector(".rep-sub-items").addEventListener("change", () => {
        subcatId = selectedRsn.subcategories[parseInt(document.querySelector(".rep-sub-items input:checked").getAttribute("value"))].id;
      })
    }
  })
  document.querySelector(".cont-report").addEventListener("click", async () => {
    noclick()
    let repstat = new Status("rep");
    repstat.Show("Reporting the question...", "indigo")
    await fetch('https://brainly.com/api/28/api_moderation/abuse_report', {
      method: 'POST',
      body: JSON.stringify({
        model_id: qid,
        model_type_id: 1,
        abuse:{
          category_id: selectedRsn.id,
          subcategory_id: subcatId,
          data: null
        }
      })
    }).then(data => data.json())
    .then((data) => {
      repstat.Close();
      document.querySelector(".blockint").remove()
      if(data.success){
        document.querySelector(".backdrop").remove();
        element.querySelector(".brn-feed-item__points .brn-points-on-feed").querySelector(".rep-button").classList.add("reported")
        element.querySelector(".brn-feed-item__points .brn-points-on-feed").querySelector(".rep-button use").setAttribute("xlink:href", "#icon-report_flag")
    }})

  })
}
async function HomeAns(){
    const questions = document.querySelectorAll(".brn-feed-items > div[data-testid = 'feed-item']");
    for (let questionBox of Array.from(questions)) {
        let qid = questionBox.querySelector("a[data-test = 'feed-item-link']").getAttribute("href").replace("/question/","").split("?")[0];

        let actionlist = questionBox.querySelector(".sg-actions-list__hole.sg-actions-list__hole--to-right");
        if (questionBox.querySelector(".preview-button")) continue;
        questionBox.querySelector(".brn-feed-item__footer .sg-actions-list").insertAdjacentElement("afterend", Component.Button({
          size: "m",
          type: "solid",
          ClassNames: ["preview-button"],
          icon: "seen",
          iconSize: "24"
        }));
        questionBox.querySelector(".preview-button").addEventListener("click", () => {Preview.Display(qid)})
        try{
          if(actionlist.querySelector("a")){
            actionlist.querySelector("a").classList.add("newansbut")
            actionlist.querySelector("a").innerHTML = '<div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-plus"></use></svg></div>'
          }
        }catch(err){}

        //check if the question has been reported + add the report flag
        let bdata = await BrainlyAPI.GetQuestion(parseInt(qid));
        questionBox.querySelector(".brn-feed-item__points .brn-points-on-feed").insertAdjacentElement("afterbegin",
            Component.Button({
              size: "s",
              type: "solid",
              ClassNames: ["rep-button"],
              icon: "report_flag_outlined",
              id: "report-"+qid
            })
          )

        if(bdata.data.task.settings.is_marked_abuse === true){
          questionBox.querySelector(".brn-feed-item__points .brn-points-on-feed").querySelector(".rep-button").classList.add("reported")
          questionBox.querySelector(".brn-feed-item__points .brn-points-on-feed").querySelector(".rep-button use").setAttribute("xlink:href", "#icon-report_flag")
        }
        questionBox.querySelector(".rep-button").addEventListener("click", () => {repMenu(qid, questionBox)})
    }
}
export async function UserSearchTool(){
  //add searc here
}
export async function HomeMod() {
    const questions = document.querySelectorAll(".brn-feed-items > div[data-testid = 'feed-item']");
    for (let questionBox of Array.from(questions)) {
      let qid = questionBox.querySelector("a[data-test = 'feed-item-link']").getAttribute("href").replace("/question/","").split("?")[0];
      
      //check if the answer button is available
      try{
        let actionlist = questionBox.querySelector(".sg-actions-list__hole.sg-actions-list__hole--to-right");
        if (questionBox.querySelector(".mod-button")) continue;
        actionlist.insertAdjacentHTML("afterend", modbutton);
        actionlist.querySelector("a").classList.add("newansbut")
        actionlist.querySelector("a").innerHTML = '<div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-plus"></use></svg></div>'
      }catch(err){
        if(questionBox.id !== "noanswer"){
          questionBox.id = 'noanswer'
          questionBox.querySelector(".brn-feed-item__footer .sg-actions-list").insertAdjacentHTML("afterend", `<div class = "sg-actions-list__hole sg-actions-list__hole--to-right">${modbutton}</div>`);
        }
      }
  
      //check if the question has been reported + add the report flag
      let bdata = await BrainlyAPI.GetQuestion(parseInt(qid));
      questionBox.querySelector(".brn-feed-item__points .brn-points-on-feed").insertAdjacentElement("afterbegin",
          Component.Button({
            size: "s",
            type: "solid",
            ClassNames: ["rep-button"],
            icon: "report_flag_outlined",
            id: "report-"+qid
          })
        )

      if(bdata.data.task.settings.is_marked_abuse === true){
        questionBox.querySelector(".brn-feed-item__points .brn-points-on-feed").querySelector(".rep-button").classList.add("reported")
        questionBox.querySelector(".brn-feed-item__points .brn-points-on-feed").querySelector(".rep-button use").setAttribute("xlink:href", "#icon-report_flag")
      }
      questionBox.querySelector(".rep-button").addEventListener("click", () => {repMenu(qid, questionBox)})
  
      //mod ticket event listeners
      questionBox.querySelector(".mod-button").addEventListener("click", async function(){
        insert_ticket(qid, questionBox.querySelector(".modticket > .sg-spinner-container__overlay"))
      });
  
      //livemod setup
      //questionBox.querySelector(".brn-feed-item").setAttribute("id", qid);
    }
    //subscribe()
  }
  export function permissionChecks(){
    return(/*html*/`
   
    <label class="sg-checkbox permission" for="" >
    <input type="checkbox" class="sg-checkbox__element perm1" id="1">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Junior Mod+</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm2" id="2">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Senior Mod</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm3" id="3">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Super Mod</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm4" id="4">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Admin</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm5" id="5">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">VT Answerer</span>
    </label>
    
    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm6" id="6">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">VT Moderator</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm7" id="7">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">VT Admin</span>
    </label>

    <button class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-blue submit-permissions">
      <div class="spinner-container">
          <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
      </div>
      <span class="sg-button__text">Update</span>
    </button>
    `)
}


