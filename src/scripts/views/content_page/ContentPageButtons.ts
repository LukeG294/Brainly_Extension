
import Extension from "../../../locales/en/localization.json"

export function deletion_menu() {
    return ( /*html*/ `
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