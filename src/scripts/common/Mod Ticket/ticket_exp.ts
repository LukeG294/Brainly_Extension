import {runtime} from "webextension-polyfill";
import Extension from "../../../locales/en/localization.json"
let noanswer = runtime.getURL("resources/Compositions/Feature In Progress.svg");
export function ticket(){
  
    return(/*html*/`
    <div class = "modal_back"><div class = "modal">
      <div class="title">
      <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45; margin-bottom:8px;">${Extension.titles.questionContent}</h1>
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
          <div class = "report">
          <div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-report_flag"></use></svg></div>
          <div class="text-rep">
            <div class="user-info">
              <a class="username sg-text sg-text--gray sg-text--bold sg-text--small rightdot">LoremIpsum</a>
              <div class="rank sg-text sg-text--small">Helping Hand</div>
            </div>
            <div class="report-info">
              <div class="sg-text">Reason</div>
            </div>
          </div>
          </div>
          <div class="qdata">
            <div class="user-info">
              <div class="ptsbox" style = "position: absolute; right:16px;"><div role="button" class="Tooltip-module__brn-tooltip-children--2gl8t" tabindex="0" aria-haspopup="true" aria-expanded="false"><div data-testid="points_counter" class="sg-counter sg-counter--xs sg-counter--red-50 sg-counter--with-icon"><div class="sg-flex sg-counter__icon-container"><div class="sg-icon sg-icon--icon-black sg-icon--x24 sg-counter__icon"><svg class="sg-icon__svg" style = "fill: black!important;"><use xlink:href="#icon-points"></use></svg></div></div><div class="sg-flex sg-flex--align-items-center"><span class="sg-text sg-text--small sg-text--bold sg-counter__text"><span class="sg-text sg-text--text-gray-60 sg-text--small sg-text--bold sg-text--no-wrap"><span class="sg-text sg-text--small sg-text--bold text-points">+5</span> pts</span></span></div></div></div></div>
              <div class="pfp"><div class="sg-avatar"><div class="sg-avatar__image sg-avatar__image--icon"><div class="sg-icon sg-icon--gray-light sg-icon--x32 sg-avatar__icon"><svg class="sg-icon__svg"><use xlink:href="#icon-profile"></use></svg></div></div></div></div>
              <div class="qdata-info-txt">
                <div class="text-user">
                  <a class="username sg-text sg-text--gray sg-text--bold sg-text--small rightdot">JohnDoe</a>
                  <div class="warns sg-text sg-text--small rightdot"></div>
                  <div class="rank sg-text sg-text--small">Ambitious</div>
                </div>
                <div class="text-subj">
                  <div class = "sg-text sg-text--xsmall rightdot">time</div>
                  <div class = "sg-text sg-text--xsmall rightdot">Subject</div>
                  <div class = "sg-text sg-text--xsmall">Middle School</div>
                </div>
              </div>
            </div>
            <div class="content sg-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div class="attachments">
              <div class="attachment-tools">
                <button class="newtab"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-open_in_new_tab"></use></svg></div></button>
                <button class="rotate"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-rotate"></use></svg></div></button>
                <button class="deleteAttachment"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg></div></button>
              </div>
            </div>
            <div class="attach-list"></div>
            <div class="actions">
              <div class="access">
                <div class="commentvis">
                  <div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-comment"></use></svg></div>
                  <div class="sg-text sg-text--small sg-text--gray-secondary commentnum">-</div>
                </div>
              </div>
              <div class="mod">
                <button class="actionbut qdel one">1</button>
                <button class="actionbut qdel two">2</button>
                <button class="actionbut qdel three">3</button>
                
                <div class="actionbut confirm" style="border-color: #60d399!important;"><div class="sg-icon sg-icon--dark sg-icon--x32" style="fill: #60d399;"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div></div>
                <div class="actionbut delete"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg></div></div>
              </div>
            </div>
            <div class="delmenu">
              <div class="primary-items sg-radio-group sg-radio-group__items sg-radio-group__items--direction-row" role = "radiogroup"></div>
              <div class="secondary-items sg-radio-group sg-radio-group__items sg-radio-group__items--direction-row" role = "radiogroup"></div>
              <textarea placeholder="Reason" class=" deletion-reason sg-textarea sg-textarea--tall"></textarea>
              <div class="sg-space-x-m del-options">
                <div class="warnpts">
                    <div class="sg-checkbox sg-checkbox--dark sg-checkbox--with-padding">
                      <div class="sg-checkbox__wrapper">
                        <div class="sg-checkbox__element">
                          <input class="sg-checkbox__input" id="pts" type="checkbox" aria-checked="false" aria-describedby="" value="">
                          <span class="sg-checkbox__icon" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.475 8.01008L6.48494 11.0201L12.5249 4.98" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                          </span>
                        </div>
                        <label for="pts" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">${Extension.buttons.takePoints}</label>
                      </div>
                    </div>

                  <div class="sg-checkbox sg-checkbox--dark sg-checkbox--with-padding">
                    <div class="sg-checkbox__wrapper">
                      <div class="sg-checkbox__element">
                        <input class="sg-checkbox__input" id="res-pts" type="checkbox" aria-checked="false" aria-describedby="" value="">
                        <span class="sg-checkbox__icon" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.475 8.01008L6.48494 11.0201L12.5249 4.98" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </span>
                      </div>
                      <label for="res-pts" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">take back respondents' points</label>
                    </div>
                  </div>

                  <div class="sg-checkbox sg-checkbox--dark sg-checkbox--with-padding">
                    <div class="sg-checkbox__wrapper">
                      <div class="sg-checkbox__element">
                        <input class="sg-checkbox__input" id="warn" type="checkbox" aria-checked="false" aria-describedby="" value="">
                        <span class="sg-checkbox__icon" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.475 8.01008L6.48494 11.0201L12.5249 4.98" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </span>
                      </div>
                      <label for="warn" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">${Extension.buttons.warnUser}</label>
                    </div>
                  </div>
                </div>
                <div class="confirmdel">
                <button class="sg-button sg-button--m sg-button--outline"><span class="sg-button__text">confirm</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sg-flex sg-flex--margin-bottom-m task-comments comments">
          
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