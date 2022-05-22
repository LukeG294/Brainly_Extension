import {runtime} from "webextension-polyfill";
import Extension from "../../../locales/en/localization.json"
let noanswer = runtime.getURL("resources/Compositions/Feature In Progress.svg");
export function Preview(qcont, time, subject, grade, pts, qpfp, username, ranks){
  
    return(/*html*/`
    <div class = "modal_back"><div class = "modal">
      <div class="title">
      <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45; margin-bottom:8px;">Question Preview</h1>
      </div>
    
      <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
    
      <div class = "preview-content scrollfade">
    
        <div class="sg-spinner-container">
          <div class="sg-spinner-container__overlay">
            <div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div>
          </div>
        </div>
        <div class = "content-item question">
        <h1 class="sg-text-bit sg-text-bit--small sg-text-bit--peach-primary" style="display: flex;justify-content: center;line-height: 1.2rem;font-size: 1rem;color: #c3d1dd;align-items: center;">${Extension.titles.question}</h1>

          <div class="qdata">
            <div class="user-info">
              <div class="ptsbox" style = "position: absolute; right:16px;"><div role="button" class="Tooltip-module__brn-tooltip-children--2gl8t" tabindex="0" aria-haspopup="true" aria-expanded="false"><div data-testid="points_counter" class="sg-counter sg-counter--xs sg-counter--red-50 sg-counter--with-icon"><div class="sg-flex sg-counter__icon-container"><div class="sg-icon sg-icon--icon-black sg-icon--x24 sg-counter__icon"><svg class="sg-icon__svg" style = "fill: black!important;"><use xlink:href="#icon-points"></use></svg></div></div><div class="sg-flex sg-flex--align-items-center"><span class="sg-text sg-text--small sg-text--bold sg-counter__text"><span class="sg-text sg-text--text-gray-60 sg-text--small sg-text--bold sg-text--no-wrap"><span class="sg-text sg-text--small sg-text--bold text-points">+${pts}</span> pts</span></span></div></div></div></div>
              <div class="pfp">
                ${qpfp}
              </div>
              <div class="qdata-info-txt">
                <div class="text-user">
                  <a class="username sg-text sg-text--gray sg-text--bold sg-text--small rightdot">${username}</a>
                  <div class="rank sg-text sg-text--small" style = "color : ${ranks.color}">${ranks.names[0]}</div>
                </div>
                <div class="text-subj">
                  <div class = "sg-text sg-text--xsmall rightdot">${time}</div>
                  <div class = "sg-text sg-text--xsmall rightdot">${subject}</div>
                  <div class = "sg-text sg-text--xsmall">${grade}</div>
                </div>
              </div>
            </div>
            <div class="content sg-text">
              ${qcont}
            </div>
            <div class="attachments">
              <div class="attachment-tools">
                <button class="newtab"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-open_in_new_tab"></use></svg></div></button>
                <button class="rotate"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-rotate"></use></svg></div></button>
              </div>
            </div>
            <div class="attach-list"></div>
            <div class="actions">
              <div class="access">
              </div>
              <div class="rep">
                <div class="actionbut delete"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg></div></div>
              </div>
            </div>
          </div>
        </div>
        <div class = "answers">
          <div class="noanswer">
            <img src="${noanswer}" alt="">
            <h1 class="sg-text-bit sg-text-bit--small sg-text-bit--peach-primary">${Extension.common.noAnswersYet}</h1>
          </div>
        </div>
      </div>
    `)
  }