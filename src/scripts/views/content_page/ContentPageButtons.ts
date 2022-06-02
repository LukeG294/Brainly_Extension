import {
    runtime
} from "webextension-polyfill"
import Extension from "../../../locales/en/localization.json"

export function select_all() {
    return ( /*html*/ `
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

export function toggle_selected() {
    return ( /*html*/ `
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

export function copy_links() {
    return ( /*html*/ `
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

export function delete_selected() {
    return ( /*html*/ `
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
export function get_reported_content() {
    return ( /*html*/ `
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
export function approve_selected() {
    return ( /*html*/ `
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

export function confirm_selected() {
    return ( /*html*/ `
    <button class="sg-button sg-button--m sg-button--solid-blue modButtons" id="confirmSelected">
    <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
      <span class="sg-button__icon sg-button__icon--m">
        <div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img"  focusable="false"><text id="title-add_more-9qmrbd" hidden="">star outlined</text>
            <use xlink:href="#icon-star" aria-hidden="true"></use>
          </svg></div>
      </span><span class="sg-button__text">${Extension.buttons.confirm}</span>
    </button>
                    
                     
    `)
}

export function unverify_selected() {
    return ( /*html*/ `
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