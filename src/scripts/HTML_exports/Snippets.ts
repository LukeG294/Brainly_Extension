import Extension from "../../locales/en/localization.json";

export function DelMenu(){
    return(
        /*html*/` <div class="delmenu">
      <div class="primary-items"></div>
      <div class="secondary-items"></div>
      <textarea placeholder="Reason" class=" deletion-reason sg-textarea sg-textarea--tall"></textarea>
      <div class="sg-space-x-m del-options">
        <div class="warnpts">
          <label class="sg-checkbox" for="warn">
            <input type="checkbox" class="sg-checkbox__element" id="warn">
            <div class="sg-checkbox__ghost" aria-hidden="true">
              <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
            </div>
            <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label">${Extension.buttons.warnUser}</span>
          </label>
        </div>
        <div class="confirmdel">
        <button class="sg-button sg-button--m sg-button--outline"><span class="sg-button__text">confirm</span></button>
        </div>
      </div>
    </div>`
    )
}
export function AnswerElem(a) {
    return(/*html*/`
    <div class = "content-item answer${a}">
    <h1 class="sg-text-bit sg-text-bit--small sg-text-bit--peach-primary" style="display: flex;justify-content: center;line-height: 1.2rem;font-size: 1rem;color: #c3d1dd;align-items: center;">answer #${a+1}</h1>
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
      <div class="adata">
        <div class="user-info">
          <div class="pfp"><div class="sg-avatar"><div class="sg-avatar__image sg-avatar__image--icon"><div class="sg-icon sg-icon--gray-light sg-icon--x32 sg-avatar__icon"><svg class="sg-icon__svg"><use xlink:href="#icon-profile"></use></svg></div></div></div></div>
          <div class="adata-info-txt">
            <div class="text-user">
              <a class="username sg-text sg-text--gray sg-text--bold sg-text--small rightdot">username</a>
              <div class="rank sg-text sg-text--small">Ambitious</div>
            </div>
            <div class="text-subj">
              <div class = "sg-text sg-text--xsmall time rightdot">time</div>
              <div class = "sg-text sg-text--xsmall">ansnum</div>
            </div>
          </div>
        </div>
        <div class="content sg-text">
          Content
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
            <div class="commentvis">
              <div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-comment"></use></svg></div>
              <div class="sg-text sg-text--small sg-text--gray-secondary commentnum">-</div>
            </div>
          </div>
          <div class="mod">
            <button class="actionbut adel one">1</button>
            <button class="actionbut adel two">2</button>
            <button class="actionbut adel three">3</button>
            
            <div class="actionbut confirm"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div></div>
            <div class="actionbut approve"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-verified"></use></svg></div></div>
            <div class="actionbut correction"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-pencil"></use></svg></div></div>
            <div class="actionbut delete"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg></div></div>
          </div>
        </div>
        <div class="afc">
          <textarea placeholder="Reason" class=" deletion-reason sg-textarea sg-textarea--tall"></textarea>
          <div class="sg-space-x-m del-options">
          <div class="confirmafc">
            <button class="sg-button sg-button--m sg-button--outline"><span class="sg-button__text">Ask for correction</span></button>
          </div>
        </div>
        </div>
        <div class="delmenu">
                <div class="primary-items"></div>
                <div class="secondary-items"></div>
                <textarea placeholder="Reason" class=" deletion-reason sg-textarea sg-textarea--tall"></textarea>
                <div class="sg-space-x-m del-options">
                  <div class="warnpts">
                  <label class="sg-checkbox" for="pts${a}">
                      <input type="checkbox" class="sg-checkbox__element" id="pts${a}">
                      <div class="sg-checkbox__ghost" aria-hidden="true">
                        <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
                      </div>
                      <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label">${Extension.buttons.takePoints}</span>
                    </label>
                    <label class="sg-checkbox" for="warn${a}">
                      <input type="checkbox" class="sg-checkbox__element" id="warn${a}">
                      <div class="sg-checkbox__ghost" aria-hidden="true">
                        <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
                      </div>
                      <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label">${Extension.buttons.warnUser}</span>
                    </label>
                  </div>
                  <div class="confirmdel">
                  <button class="sg-button sg-button--m sg-button--outline"><span class="sg-button__text">${Extension.buttons.confirm}</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="sg-flex sg-flex--margin-bottom-m response-comments${a} comments"></div>
    `)
}