import {runtime} from "webextension-polyfill"
import Extension from "../../../locales/en/localization.json"

export function select_all(){
    return(/*html*/`
      <button class="sg-button sg-button--m sg-button--solid-light modButtons selectAll" id="selectAll">
      <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
        <span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24">
          <svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">plus outlined</text>
          <use xlink:href="#icon-add_more" aria-hidden="true"></use>
          </svg>
        </div>
        </span><span class="sg-button__text">${Extension.buttons.selectAll}</span></button>
                    
                    
    `)
}

export function toggle_selected(){
    return(/*html*/`
    <button class="sg-button sg-button--m sg-button--solid-light modButtons" id="toggleSelected">
    <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
      <span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">filter filled</text>
            <use xlink:href="#icon-filters" aria-hidden="true"></use>
          </svg></div>
      </span><span class="sg-button__text">${Extension.buttons.toggleSelected}</span>
    </button>
                    
                     
    `)
}

export function copy_links(){
    return(/*html*/`
    <button class="sg-button sg-button--m sg-button--solid-light modButtons" id="copyLinks">
    <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
      <span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">clibboard filled</text>
            <use xlink:href="#icon-clipboard" aria-hidden="true"></use>
          </svg></div>
      </span><span class="sg-button__text">${Extension.buttons.copySelectedLinks}</span>
    </button>
                    
                     
    `)
}

export function delete_selected_questions(){
    return(/*html*/`
    <button class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach modButtons" id="deleteSelected">
      <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
      <span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">trash filled</text>
            <use xlink:href="#icon-trash" aria-hidden="true"></use>
          </svg></div>
      </span><span class="sg-button__text">${Extension.buttons.deleteContentPage}</span>
    </button>                   
    `)
}
export function delete_selected_answers(){
  return(/*html*/`
  <button class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach modButtons" id="deleteSelected">
  <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
    <span class="sg-button__icon sg-button__icon--m">
      <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">trash filled</text>
          <use xlink:href="#icon-trash" aria-hidden="true"></use>
        </svg></div>
    </span><span class="sg-button__text">${Extension.buttons.deleteContentPage}</span>
  </button>
  `)
}
export function delete_selected_comments(){
  return(/*html*/`
  <button class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach modButtons" id="deleteSelectedComments">
  <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
    <span class="sg-button__icon sg-button__icon--m">
      <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">trash filled</text>
          <use xlink:href="#icon-trash" aria-hidden="true"></use>
        </svg></div>
    </span><span class="sg-button__text">${Extension.buttons.deleteContentPage}</span>
  </button>
                  
                   
  `)
}
export function get_reported_content(){
  return(/*html*/`
  <button class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach modButtons" id="fetchReported">
    <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
    <span class="sg-button__icon sg-button__icon--m">
      <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">trash filled</text>
          <use xlink:href="#icon-report_flag" aria-hidden="true"></use>
        </svg></div>
    </span><span class="sg-button__text">${Extension.buttons.fetchReported}</span>
  </button>                   
  `)
}
export function approve_selected(){
    return(/*html*/`
    <button class="sg-button sg-button--m sg-button--solid-mint modButtons" id="approveSelected">
    <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
      <span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">check filled</text>
            <use xlink:href="#icon-check" aria-hidden="true"></use>
          </svg></div>
      </span><span class="sg-button__text">${Extension.buttons.approve}</span>
    </button>
                    
                     
    `)
}

export function confirm_selected_questions(){
    return(/*html*/`
    <button class="sg-button sg-button--m sg-button--solid-blue modButtons" id="confirmSelectedQuestions">
    <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
      <span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">star outlined</text>
            <use xlink:href="#icon-star" aria-hidden="true"></use>
          </svg></div>
      </span><span class="sg-button__text">${Extension.buttons.confirm}</span>
    </button>
                    
                     
    `)
}
export function confirm_selected_answers(){
  return(/*html*/`
  <button class="sg-button sg-button--m sg-button--solid-blue modButtons" id="confirmSelectedAnswers">
  <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
    <span class="sg-button__icon sg-button__icon--m">
      <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">star outlined</text>
          <use xlink:href="#icon-star" aria-hidden="true"></use>
        </svg></div>
    </span><span class="sg-button__text">${Extension.buttons.confirm}</span>
  </button>
                  
                   
  `)
}

export function unverify_selected(){
    return(/*html*/`
    <button class="sg-button sg-button--m sg-button--solid-black modButtons" id="unverify">
      <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
      <span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">star outlined</text>
            <use xlink:href="#icon-less" aria-hidden="true"></use>
          </svg></div>
      </span><span class="sg-button__text">${Extension.buttons.unverify}</span>
    </button>
                    
                     
    `)
}

export function deletion_menu(){
    return(/*html*/`
    <div class="delmenu">
              <div class="primary-items"></div>
              <div class="secondary-items"></div>
              <textarea placeholder="Reason" class=" deletion-reason sg-textarea sg-textarea--tall"></textarea>
              <div class="sg-space-x-m del-options">
                <div class="warnpts">
                <label class="sg-checkbox" for="pts">
                    <input type="checkbox" class="sg-checkbox__element" id="pts">
                    <div class="sg-checkbox__ghost" aria-hidden="true">
                      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
                    </div>
                    <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label">${Extension.buttons.takePoints}</span>
                  </label>
                  <label class="sg-checkbox" for="res-pts">
                    <input type="checkbox" class="sg-checkbox__element" id="res-pts">
                    <div class="sg-checkbox__ghost" aria-hidden="true">
                      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
                    </div>
                    <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Take back Respondents' Points</span>
                  </label>
                  <label class="sg-checkbox" for="warn">
                    <input type="checkbox" class="sg-checkbox__element" id="warn">
                    <div class="sg-checkbox__ghost" aria-hidden="true">
                      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
                    </div>
                    <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label">${Extension.buttons.warnUser}</span>
                  </label>
                </div>
                <div class="confirmdel">
                <button class="sg-button sg-button--m sg-button--outline" id="delete"> <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">${Extension.buttons.confirm}</span></button>
                </div>
              </div>
            </div>
    `)
}

export function add_icons(){
  
    let choice = document.querySelector("#tabs-doj ul")
    if(choice.children[0].classList.value === "active"){
      let n_content = document.querySelector("tbody");
      for(let i = 0; i < n_content.childElementCount; i++){
        let contentlink = document.querySelector("tbody").children[i];
        let xhr = new XMLHttpRequest();
        
        xhr.withCredentials = true;
  
        contentlink.children[1].classList.add("iconcell");
        let qid = contentlink.querySelector("a").href.replace("https://brainly.com/question/", "");
  
        let boxthing = document.createElement("div");
        contentlink.children[1].prepend(boxthing)
        
  
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            let resp = JSON.parse(this.responseText);
  
            if(resp.data.task.settings.is_marked_abuse === true){
              let reportflag = document.createElement("div");
              reportflag.innerHTML = `<svg viewBox="0 0 512 512" style="overflow: visible" id="icon-report_flag" xmlns="http://www.w3.org/2000/svg"><title>report flag</title><path d="M405.33 128H307.2l-5.12-25.6a21.29 21.29 0 0 0-20.9-17.07H128a21.4 21.4 0 0 0-21.33 21.34v320a21.33 21.33 0 1 0 42.66 0v-128H268.8l5.12 25.6a21.08 21.08 0 0 0 20.9 17.06h110.51A21.4 21.4 0 0 0 426.67 320V149.33A21.4 21.4 0 0 0 405.33 128zM192 234.67a21.33 21.33 0 0 1-42.67 0v-85.34a21.33 21.33 0 0 1 42.67 0v85.34z"/></svg>`
              reportflag.classList.add("contenticon", "report");
              boxthing.appendChild(reportflag)
            }
            if(String(resp.data.task.attachments) !== ""){
              let attach = document.createElement("div");
              attach.innerHTML = `<svg viewBox="0 0 512 512" style="overflow: visible" id="icon-attachment" xmlns="http://www.w3.org/2000/svg"><title>attachment</title><path d="M331 182L224 288c-8 8-22 8-30 0-9-9-9-22 0-31l122-121c25-25 66-25 91 0 26 25 26 66 0 91L270 363c-42 42-110 42-153 0-42-42-42-109 0-151l61-61c9-8 9-22 0-30-8-8-22-8-30 0l-61 61c-59 58-59 153 0 211 59 59 154 59 213 0l138-136c42-41 42-109 0-151s-111-42-153 0L163 227a64 64 0 0 0 0 91c25 25 66 25 92 0l106-106c9-8 9-22 0-30-8-9-22-9-30 0z"/></svg>`
              attach.classList.add("contenticon", "attach");
              boxthing.appendChild(attach)
              attach.id = qid;
            }
            //(resp.users_data.find({names}) => names === "")
        
          }
        });
        xhr.open("POST", `https://brainly.com/api/28/api_tasks/main_view/${qid}?accept=application/json`);
        xhr.send();
      }
    }
    if(choice.children[1].classList.value === "active"){
      let n_content = document.querySelector("tbody");
      for(let i = 0; i < n_content.childElementCount; i++){
        let contentlink = document.querySelector("tbody").children[i];
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
  
        contentlink.children[1].classList.add("iconcell");
        let qid = contentlink.children[1].querySelector("a").href.replace("https://brainly.com/question/", "");
        let userId = window.location.href.replace("https://brainly.com/users/user_content/","").split("/")[0]
        let boxthing = document.createElement("div");
        contentlink.children[1].prepend(boxthing)
  
        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            let r = JSON.parse(this.responseText);
            let response = r.data.responses.find(res => String(res.user_id) === String(userId));
            
            if(String(response.attachments) !== ""){
              let attach = document.createElement("div");
              attach.innerHTML = `<svg viewBox="0 0 512 512" style="overflow: visible" id="icon-attachment" xmlns="http://www.w3.org/2000/svg"><title>attachment</title><path d="M331 182L224 288c-8 8-22 8-30 0-9-9-9-22 0-31l122-121c25-25 66-25 91 0 26 25 26 66 0 91L270 363c-42 42-110 42-153 0-42-42-42-109 0-151l61-61c9-8 9-22 0-30-8-8-22-8-30 0l-61 61c-59 58-59 153 0 211 59 59 154 59 213 0l138-136c42-41 42-109 0-151s-111-42-153 0L163 227a64 64 0 0 0 0 91c25 25 66 25 92 0l106-106c9-8 9-22 0-30-8-9-22-9-30 0z"/></svg>`
              attach.classList.add("contenticon", "attach");
              boxthing.appendChild(attach)
              attach.id = qid;
            }
            if(response.approved.approver !== null){
              let approve = document.createElement("div");
              approve.innerHTML = `<svg viewBox="0 0 512 512" style="overflow: visible" id="icon-verified" xmlns="http://www.w3.org/2000/svg"><title>verified</title><path d="M458.68 177.07l-51.58-25.6-8.93-53.33a24.5 24.5 0 0 0-26.66-19.2l-55.99 8.53L275 49.07a22.52 22.52 0 0 0-31.45 0l-44.66 38.4-55.98-8.53a23.1 23.1 0 0 0-26.93 19.2l-8.93 53.33-51.45 25.6a23.92 23.92 0 0 0-11.2 29.86L71.08 256 46.8 305.07a25.59 25.59 0 0 0 8.94 29.86l51.45 25.6 8.93 53.34a24.6 24.6 0 0 0 26.92 19.2l55.99-8.54 40.25 38.4a22.37 22.37 0 0 0 31.32 0l40-38.4 55.98 8.54a23.1 23.1 0 0 0 27.05-19.2l8.93-53.34 51.46-25.6a21 21 0 0 0 8.93-29.86L443.08 256h-.13l24.66-49.07a25.77 25.77 0 0 0-8.93-29.86zm-112.17 48.76L256 316.34a21.4 21.4 0 0 1-30.17 0L165.5 256a21.33 21.33 0 1 1 30.17-30.17l45.26 45.25 75.42-75.42a21.33 21.33 0 0 1 30.17 30.17z"/></svg>`
              approve.classList.add("contenticon", "approve");
              boxthing.appendChild(approve)
            }
            if(response.settings.is_marked_abuse === true){
              let reportflag = document.createElement("div");
              reportflag.innerHTML = `<svg viewBox="0 0 512 512" style="overflow: visible" id="icon-report_flag" xmlns="http://www.w3.org/2000/svg"><title>report flag</title><path d="M405.33 128H307.2l-5.12-25.6a21.29 21.29 0 0 0-20.9-17.07H128a21.4 21.4 0 0 0-21.33 21.34v320a21.33 21.33 0 1 0 42.66 0v-128H268.8l5.12 25.6a21.08 21.08 0 0 0 20.9 17.06h110.51A21.4 21.4 0 0 0 426.67 320V149.33A21.4 21.4 0 0 0 405.33 128zM192 234.67a21.33 21.33 0 0 1-42.67 0v-85.34a21.33 21.33 0 0 1 42.67 0v85.34z"/></svg>`
              reportflag.classList.add("contenticon", "report");
              boxthing.appendChild(reportflag);
            }
            if(response.best === true){
              let crown = document.createElement("div");
              crown.innerHTML = `<svg viewBox="0 0 512 512" style="overflow: visible" id="icon-crown" xmlns="http://www.w3.org/2000/svg"><title>crown</title><path d="M265.54 156.622a21.333 21.333 0 0 1 9.541 9.54l66.252 132.505 62.154-49.723c9.2-7.36 22.625-5.868 29.985 3.332a21.333 21.333 0 0 1 4.33 17.143l-29.284 161.064C406.674 440.627 397.84 448 387.53 448H124.471c-10.31 0-19.145-7.373-20.99-17.517L74.198 269.419c-2.107-11.592 5.581-22.698 17.173-24.806a21.333 21.333 0 0 1 17.143 4.331l62.154 49.723 66.252-132.505c5.269-10.538 18.083-14.81 28.622-9.54zm171.793-7.289c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32zm-362.666 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32zM256 64c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32z" fill-rule="evenodd"/></svg>`
              crown.classList.add("contenticon", "crown");
              boxthing.appendChild(crown)
            }
          }
        });
  
        xhr.open("GET", "https://brainly.com/api/28/api_tasks/main_view/"+qid+"?accept=application/json");
        xhr.send();
      }
    }
  
}
