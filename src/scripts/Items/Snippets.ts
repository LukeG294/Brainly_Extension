import Extension from "../../locales/en/localization.json";
import Form from "./Form"

export function DelMenu(){
    return(
        /*html*/` <div class="delmenu">
      <div class="primary-items"></div>
      <div class="secondary-items"></div>
      <textarea placeholder="Reason" class=" deletion-reason sg-textarea sg-textarea--tall"></textarea>
      <div class="sg-space-x-m del-options">
        <div class="warnpts">
          ${
            Form.Checkbox({
                id: "warn",
                text: Extension.buttons.warnUser,
            }).outerHTML
          }
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
    <div data-testid="answer_box_header" class="AnswerBoxHeader-module__header--2JjZN AnswerBoxHeader-module__headerVerified--1mZAq verifiedheader">
    <div class="sg-flex sg-flex--align-items-center">
      <div data-testid="answer_box_header_expert_verified_icon" class="sg-flex sg-flex--margin-right-s"><div class="sg-icon sg-icon--icon-green-50 sg-icon--x32"><svg class="sg-icon__svg" role="img" aria-labelledby="title-verified-p9kprv" focusable="false"><text id="title-verified-p9kprv" hidden="">verified</text><use xlink:href="#icon-verified" aria-hidden="true"></use></svg></div></div><div class="sg-flex sg-flex--align-items-center">
        <div class="sg-hide-for-medium-up"><h3 class="sg-headline sg-headline--small">Expert-verified answer
          <div class="AnswerBoxHeader-module__tooltipInline--1W7LW" data-testid="answer_box_header_headline_tooltip"><div class="brn-element-wrapper"><div data-testid="tooltip_container" class="Tooltip-module__brn-tooltip-container--tq9gl"><div role="button" class="Tooltip-module__brn-tooltip-children--2gl8t" tabindex="0" aria-haspopup="true" aria-expanded="false"><div class="sg-icon sg-icon--icon-black sg-icon--x16"><svg class="sg-icon__svg" role="img" aria-labelledby="title-question-5ywvs" focusable="false"><text id="title-question-5ywvs" hidden="">question</text><use xlink:href="#icon-question" aria-hidden="true"></use></svg></div></div></div></div></div></h3></div><div class="sg-hide-for-small-only"><h3 class="sg-headline sg-headline--medium">Expert-verified answer<div class="AnswerBoxHeader-module__tooltipInline--1W7LW" data-testid="answer_box_header_headline_tooltip"><div class="brn-element-wrapper"><div data-testid="tooltip_container" class="Tooltip-module__brn-tooltip-container--tq9gl"><div role="button" class="Tooltip-module__brn-tooltip-children--2gl8t" tabindex="0" aria-haspopup="true" aria-expanded="false"><div class="sg-icon sg-icon--icon-black sg-icon--x16"><svg class="sg-icon__svg" role="img" aria-labelledby="title-question-3wn7et" focusable="false"><text id="title-question-3wn7et" hidden="">question</text><use xlink:href="#icon-question" aria-hidden="true"></use></svg></div></div></div></div></div></h3></div></div></div><div class="AnswerBoxHeader-module__attributes--13vJa sg-space-x-xs md:sg-space-x-s"></div></div>
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
              <div class="warns sg-text sg-text--small rightdot"></div>
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
            <button class="actionbut adel one">1</button>
            <button class="actionbut adel two">2</button>
            <button class="actionbut adel three">3</button>
            
            <div class="actionbut confirm"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div></div>
            <div class="actionbut approve"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-verified"></use></svg></div></div>
            <div class="actionbut unapprove"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-less"></use></svg></div></div>
            <div class="actionbut correction"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-pencil"></use></svg></div></div>
            <div class="actionbut delete"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg></div></div>
          </div>
        </div>
        <div class="afc">
          <textarea placeholder="Reason" class=" afc-reason sg-textarea sg-textarea--tall"></textarea>
          <div class="sg-space-x-m del-options">
            <div class="confirmafc">
              <button class="sg-button sg-button--m sg-button--outline"><span class="sg-button__text">Ask for correction</span></button>
            </div>
          </div>
        </div>
        <div class="delmenu">
                <div class="primary-items"></div>
                <div class="secondary-items"></div>
                <textarea placeholder="Reason" class="deletion-reason sg-textarea sg-textarea--tall"></textarea>
                <div class="sg-space-x-m del-options">
                  <div class="warnpts">
                    ${
                      Form.Checkbox({
                        id: `pts${a}`,
                        text: Extension.buttons.takePoints
                      }).outerHTML
                    }
                    ${
                      Form.Checkbox({
                        id: `warn${a}`,
                        text: Extension.buttons.warnUser
                      }).outerHTML
                    }
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