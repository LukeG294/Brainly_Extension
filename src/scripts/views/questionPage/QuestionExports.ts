import { extension_server_url, pageElement, pageElementAll } from "configs/config";
import Notify from "../../common/Notifications/Notify"
import User from "../../common/User"
import Extension from "../../../locales/en/localization.json"
import { insert_ticket } from "../../common/ModFunctions";

export async function removeAnswer(id, type:string){
  if (type === 'verification'){
    let resp = await fetch(`${extension_server_url()}/answers/`+id,{method: "DELETE"})
    .then(response => response.json())
    if (resp.code){
      Notify.Flash("Could not delete: "+resp.message, "error")
    } else {
      Notify.Flash("Cancelled the request for verification.", "error")
    }
  } else if (type === 'unverification'){
    
    let resp = await fetch(`${extension_server_url()}/answers-unverify/`+id,{method: "DELETE"})
    .then(response => response.json())
    if (resp.code){
      Notify.Flash("Could not delete: "+resp.message, "error")
    } else {
      Notify.Flash("Cancelled the request for unverification.", "error")
    }
  }
}
export async function newTickets(){
  let oldTickets = document.querySelectorAll('[data-testid="options_list"]')
  oldTickets.forEach(element => {
    element.insertAdjacentHTML("afterbegin",/*html*/`
    <div class = "sg-flex sg-flex--margin-left-xxs">
    <button class="openTicketQuestionPage">
    <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
      <span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">filter filled</text>
            <use xlink:href="#icon-shield" aria-hidden="true"></use>
          </svg></div>
    </button>
    </div>
    `)
  });
  let id = window.location.href.split('/')[4].split("?")[0]
    let openTicketButtons = document.querySelectorAll('.openTicketQuestionPage')
    openTicketButtons.forEach(element => {
       if (!element.classList.contains('inserted')){
        element.addEventListener("click",function(){
          if (!document.querySelector('.modal')){}
          insert_ticket(id,element.querySelector('.spinner-container'))
          element.classList.add('inserted')
        })
       }
    });
}
export async function requestApproval(){
  let d_reference = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/api_config/desktop_view`, {method: "GET"}).then(data => data.json());
  
  async function requestVerificationButton(i){
    let requestButtons = pageElementAll(".request-verification")
    let element = new Object()
    if (pageElementAll(".request-verification").length === 2){
      element = requestButtons[i];
    } else {
      element = requestButtons[0];
    }
    //@ts-expect-error
    element.addEventListener("click", async function(){
      pageElement(".request-verification .spinner-container").classList.add("show");
      let thisResponse = responses[i]
    
      let databaseId = thisResponse.id
      let answerPreview = thisResponse.content
      let qinfo = JSON.parse(pageElement("article").getAttribute("data-z"))
      //@ts-ignore
      let requesterID = JSON.parse(pageElement("meta[name='user_data']").content).id
      //@ts-ignore
      
      let requesterAv = JSON.parse(pageElement("meta[name='user_data']").content).avatar
      //@ts-expect-error
      let requesterName = JSON.parse(pageElement("meta[name='user_data']").content).nick
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let user = await User.Data(thisResponse.userId)
      console.log(user)
      var raw = JSON.stringify({
        "settings": thisResponse,
        "answerDBid":databaseId,
        "content":answerPreview,
        "qid": qinfo.id,
        "subject":d_reference.data.subjects.find(({id}) => id === qinfo.subject_id).icon,
        "user": user,
        "requesterId":requesterID,
        "requesterName":requesterName,
        "requesterAv":requesterAv
      });
    
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    
      };

      let serverResponse = await fetch(`${extension_server_url()}/request-verify-add`, requestOptions).then(response => response.json())
      
        //@ts-ignore
        
        if (!serverResponse.message){
          Notify.Flash("The answer has been added to the verification queue.","success")
          pageElement(".request-verification .spinner-container").classList.remove("show");
          pageElement(".request-verification").remove();
          answers[i].insertAdjacentHTML("afterbegin",/*html*/` 
                <button id="${serverResponse.ref["@ref"].id}" class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach cancel-request">
                <div class="spinner-container">
                    <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                <span class="sg-button__icon sg-button__icon--m">
                <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart-215qb" focusable="false"><text id="title-heart-215qb" hidden="">cancel</text>
                  
                <use xlink:href="#icon-close" aria-hidden="true"></use>
                  </svg></div>
                </span></button>`)
                pageElement(".cancel-request").addEventListener("click", async function(){
                  pageElement(".cancel-request .spinner-container").classList.add("show");
                  await removeAnswer(this.id, 'verification')
                  pageElement(".cancel-request .spinner-container").classList.remove("show");
                  pageElement(".cancel-request").remove()
                  answers[i].insertAdjacentHTML("afterbegin",/*html*/`
                  <button class="sg-button sg-button--m sg-button--solid-mint  request-verification"> 
                    <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                    <span class="sg-button__icon sg-button__icon--m">
                      <div class="sg-icon sg-icon--adaptive sg-icon--x24">
                        <svg class="sg-icon__svg" role="img" aria-labelledby="title-heart_outlined-pld9rg" focusable="false"><text id="title-heart_outlined-pld9rg" hidden="">heart outlined</text>
                          <use xlink:href="#icon-check" aria-hidden="true"></use>
                        </svg>
                      </div>
                    </span>
                  </button>`)
                  requestVerificationButton(i)
                })

        } else {
          Notify.Flash(Extension.common.verificationQueueError + serverResponse.message,"error")
        }
        
    })
  }
  
  async function requestUnverificationButton(i){
    
    let requestButtons = pageElementAll(".request-unverification")
    const element = requestButtons[i];
    
    element.addEventListener("click", async function(){
    
      pageElementAll(".request-unverification .spinner-container")[i].classList.add("show");
      let thisResponse = responses[i]
    
      let databaseId = thisResponse.id
      let answerPreview = thisResponse.content
      let qinfo = JSON.parse(pageElement("article").getAttribute("data-z"))
      //@ts-ignore
      let requesterID = JSON.parse(pageElement("meta[name='user_data']").content).id
      //@ts-ignore
      
      let requesterAv = JSON.parse(pageElement("meta[name='user_data']").content).avatar
      //@ts-expect-error
      let requesterName = JSON.parse(pageElement("meta[name='user_data']").content).nick
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let user = await User.Data(thisResponse.userId)
      console.log(user)
      var raw = JSON.stringify({
        "settings": thisResponse,
        "answerDBid":databaseId,
        "content":answerPreview,
        "qid": qinfo.id,
        "subject":d_reference.data.subjects.find(({id}) => id === qinfo.subject_id).icon,
        "user": user,
        "requesterId":requesterID,
        "requesterName":requesterName,
        "requesterAv":requesterAv
      });
    
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    
      };

      let serverResponse = await fetch(`${extension_server_url()}/request-unverify-add`, requestOptions).then(response => response.json())
      
        //@ts-ignore
        
        if (!serverResponse.message){
          Notify.Flash("The answer has been added to the unverification queue.","success")
          if (pageElementAll(".request-unverification").length === 2){
            pageElementAll(".request-unverification .spinner-container")[i].classList.remove("show");
            pageElementAll(".request-unverification")[i].remove();
          } else {
            pageElementAll(".request-unverification .spinner-container")[0].classList.remove("show");
            pageElementAll(".request-unverification")[0].remove();
          }
          
          answers[i].insertAdjacentHTML("afterbegin",/*html*/` 
                <button id="${serverResponse.ref["@ref"].id}" class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach cancel-request-unverify">
                <div class="spinner-container">
                    <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                <span class="sg-button__icon sg-button__icon--m">
                <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart-215qb" focusable="false"><text id="title-heart-215qb" hidden="">cancel</text>
                  
                <use xlink:href="#icon-less" aria-hidden="true"></use>
                  </svg></div>
                </span></button>`)
                pageElement(".cancel-request-unverify").addEventListener("click", async function(){
                  
                  pageElement(".cancel-request-unverify .spinner-container").classList.add("show");
                  await removeAnswer(this.id, 'unverification')
                  pageElement(".cancel-request-unverify .spinner-container").classList.remove("show");
                  pageElement(".cancel-request-unverify").remove()
                  answers[i].insertAdjacentHTML("afterbegin",/*html*/`
                  <button class="sg-button sg-button--m sg-button--solid-mint  request-unverification"> s
                    <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                    <span class="sg-button__icon sg-button__icon--m">
                      <div class="sg-icon sg-icon--adaptive sg-icon--x24">
                        <svg class="sg-icon__svg" role="img" aria-labelledby="title-heart_outlined-pld9rg" focusable="false"><text id="title-heart_outlined-pld9rg" hidden="">heart outlined</text>
                          <use xlink:href="#icon-less" aria-hidden="true"></use>
                        </svg>
                      </div>
                    </span>
                  </button>`)
                  requestUnverificationButton(i)
                })

        } else {
          Notify.Flash(Extension.common.unverificationQueueError + serverResponse.message,"error")
        }
        
    })
  }
  
  let answers = document.querySelectorAll("div[data-testid = 'answer_box_options_list']")
  let responses = JSON.parse(document.querySelector("[data-testid='question_box']").getAttribute("data-z")).responses
    for (let i = 0; i < answers.length; i++) {
      console.log(responses[i]);
     if (true){
       
       let answer = responses[i].id
       let resp = await fetch(`${extension_server_url()}/get_answer_by_id/`+answer).then(response => response.json())
       let unapproveResp = await fetch(`${extension_server_url()}/get_answer_by_id_unverification/`+answer).then(response => response.json())
       let pastRejected = await fetch(`${extension_server_url()}/get_past_reject/`+answer).then(response => response.json())
       
      //if cannot find previous request then add new button
       if (!resp.data){
            
            if (responses[i].approved.date){
            
              if (unapproveResp.data){
               
                answers[i].insertAdjacentHTML("afterbegin",/*html*/` 
                <button id="${unapproveResp.ref["@ref"].id}" class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach cancel-request-unverify">
                <div class="spinner-container">
                    <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                <span class="sg-button__icon sg-button__icon--m">
                <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart-215qb" focusable="false"><text id="title-heart-215qb" hidden="">cancel</text>
                  
                <use xlink:href="#icon-less" aria-hidden="true"></use>
                  </svg></div>
                </span></button>`
                )
                pageElement(".cancel-request-unverify").addEventListener("click", async function(){
                    
                  pageElement(".cancel-request-unverify .spinner-container").classList.add("show");
                  await removeAnswer(this.id, 'unverification')
                  pageElement(".cancel-request-unverify .spinner-container").classList.remove("show");
                  pageElement(".cancel-request-unverify").remove()
                  answers[i].insertAdjacentHTML("afterbegin",/*html*/`
                  <button class="sg-button sg-button--m sg-button--solid-mint  request-unverification"> 
                    <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                    <span class="sg-button__icon sg-button__icon--m">
                      <div class="sg-icon sg-icon--adaptive sg-icon--x24">
                        <svg class="sg-icon__svg" role="img" aria-labelledby="title-heart_outlined-pld9rg" focusable="false"><text id="title-heart_outlined-pld9rg" hidden="">heart outlined</text>
                          <use xlink:href="#icon-less" aria-hidden="true"></use>
                        </svg>
                      </div>
                    </span>
                  </button>`)
                  requestUnverificationButton(i)
                })
              } else {
                answers[i].insertAdjacentHTML("afterbegin",/*html*/`
                <button class="sg-button sg-button--m sg-button--solid-mint request-unverification"> 
                  <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                  <span class="sg-button__icon sg-button__icon--m">
                    <div class="sg-icon sg-icon--adaptive sg-icon--x24">
                      <svg class="sg-icon__svg" role="img" aria-labelledby="title-heart_outlined-pld9rg" id="toColor" focusable="false"><text id="title-heart_outlined-pld9rg" hidden="">heart outlined</text>
                        <use xlink:href="#icon-less" aria-hidden="true"></use>
                      </svg>
                    </div>
                  </span>
                </button>`)
                requestUnverificationButton(i)
              }
              
              
            } else {
              answers[i].insertAdjacentHTML("afterbegin",/*html*/`
            <button class="sg-button sg-button--m sg-button--solid-mint request-verification"> 
              <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
              <span class="sg-button__icon sg-button__icon--m">
                <div class="sg-icon sg-icon--adaptive sg-icon--x24">
                  <svg class="sg-icon__svg" role="img" aria-labelledby="title-heart_outlined-pld9rg" id="toColor" focusable="false"><text id="title-heart_outlined-pld9rg" hidden="">heart outlined</text>
                    <use xlink:href="#icon-check" aria-hidden="true"></use>
                  </svg>
                </div>
              </span>
            </button>`)
              if (pastRejected.rejected === true){
                let btn = document.querySelectorAll('.request-verification')[i]
                //@ts-expect-error
                btn.style.filter = 'grayscale(1)'
                function doNothing(){}
                btn.addEventListener('click', function(){
                  Notify.Dialog("Previously Rejected", `This request was rejected from the verification queue by ${pastRejected.mod} on ${String(pastRejected.time).split('T')[0]}. Please message this moderator directly if you'd like to find out why this request was rejected.`, doNothing(), false)
                })
              } else {
                requestVerificationButton(i)
              }
            }
            
            
            
            
            
          
          //else - add already requested button
        //@ts-ignore
       } else if (resp.data.requesterId === String(JSON.parse(document.querySelector("meta[name='user_data']").content).id)){

        answers[i].insertAdjacentHTML("afterbegin",/*html*/` 
          <button id="${resp.ref["@ref"].id}" class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach cancel-request">
          <div class="spinner-container">
              <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
          <span class="sg-button__icon sg-button__icon--m">
          <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart-215qb" focusable="false"><text id="title-heart-215qb" hidden="">cancel</text>
            
          <use xlink:href="#icon-close" aria-hidden="true"></use>
            </svg></div>
          </span></button>`
        )

        pageElement(".cancel-request").addEventListener("click", async function(){
          pageElement(".cancel-request .spinner-container").classList.add("show");
          await removeAnswer(this.id, 'verification')
          pageElement(".cancel-request .spinner-container").classList.remove("show");
          pageElement(".cancel-request").remove()
          answers[i].insertAdjacentHTML("afterbegin",/*html*/`
          <button class="sg-button sg-button--m sg-button--solid-mint  request-verification"> 
            <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
            <span class="sg-button__icon sg-button__icon--m">
              <div class="sg-icon sg-icon--adaptive sg-icon--x24">
                <svg class="sg-icon__svg" role="img" aria-labelledby="title-heart_outlined-pld9rg" focusable="false"><text id="title-heart_outlined-pld9rg" hidden="">heart outlined</text>
                  <use xlink:href="#icon-check" aria-hidden="true"></use>
                </svg>
              </div>
            </span>
          </button>`)
          requestVerificationButton(i)
        })

       } else {
        answers[i].insertAdjacentHTML("afterbegin",/*html*/` 
        <button style="margin-bottom:12px; opacity:0.6; pointer-events: none;" class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-blue requested"><span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-heart-215qb" focusable="false"><text id="title-heart-215qb" hidden="">heart</text>
            <use xlink:href="#icon-counter" aria-hidden="true"></use>
          </svg></div>
      </span>
        </button>`)
       }
      
     
     } else {
       
     }
    
    }

    
}

