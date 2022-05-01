import {runtime} from "webextension-polyfill";
let noanswer = runtime.getURL("resources/Compositions/Feature In Progress.svg");
export function ticket(){
  
    return(/*html*/`
    <div class = "modal_back"><div class = "modal">
    <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45; margin-bottom:8px;">Question Content</h1>
      <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
    
      <div class = "preview-content">
    
        <div class="sg-spinner-container">
          <div class="sg-spinner-container__overlay">
            <div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div>
          </div>
        </div>
        <div class = "content-item question">
        <h1 class="sg-text-bit sg-text-bit--small sg-text-bit--peach-primary" style="display: flex;justify-content: center;line-height: 1.2rem;font-size: 1rem;color: #c3d1dd;align-items: center;">question</h1>
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
              </div>
            </div>
            <div class="attach-list"></div>
            <div class="actions">
              <button class="actionbut qdel one">1</button>
              <button class="actionbut qdel two">2</button>
              <button class="actionbut qdel three">3</button>
              
              <div class="actionbut confirm" style="border-color: #60d399!important;"><div class="sg-icon sg-icon--dark sg-icon--x32" style="fill: #60d399;"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div></div>
              <div class="actionbut delete"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg></div></div>
            </div>
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
                    <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label">take points</span>
                  </label>
                  <label class="sg-checkbox" for="warn">
                    <input type="checkbox" class="sg-checkbox__element" id="warn">
                    <div class="sg-checkbox__ghost" aria-hidden="true">
                      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
                    </div>
                    <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label">warn user</span>
                  </label>
                </div>
                <div class="confirmdel">
                <button class="sg-button sg-button--m sg-button--outline"><span class="sg-button__text">confirm</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
    
        <div class = "answers">
          <div class="noanswer">
            <img src="${noanswer}" alt="">
            <h1 class="sg-text-bit sg-text-bit--small sg-text-bit--peach-primary">no answers... yet</h1>
          </div>
        </div>
        <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;font-size:1.5rem;">Log</h1>
        <div class="log"></div>
      </div>
    `)
  }