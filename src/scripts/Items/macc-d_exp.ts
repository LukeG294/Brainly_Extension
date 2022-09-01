import Extension from "../../locales/en/localization.json"
import Form from "./Form"

export function macc_d() {
    return ( /*html*/ `
    <div class="modal_back">
        <div class="modal_accdel">
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">${Extension.titles.massAccountDeleter}</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <textarea placeholder="${Extension.instructions.onePerLine}" class=" profile-links sg-textarea sg-textarea--tall"></textarea>
                ${
                    Form.RadioGroup({
                        ClassName: ["presets"],
                        id: "del-presets",
                        type: "row",
                        items: [
                            {
                                id: "1",
                                text: "Link Spammer",
                                value: 'Link Spammer'
                            },
                            {
                                id: "2",
                                text: "Alt Accounts",
                                value: 'Alt Accounts'
                            },
                            {
                                id: "3",
                                text: "Inappropriate Username",
                                value: 'Inappropriate Username'
                            },
                            {
                                id: "4",
                                text: "Inactive",
                                value: 'Inactive'
                            }
                        ],
                        LookFor: {
                            name: "text",
                            id: "id"
                        }
                    }).outerHTML
                }
            <textarea placeholder="Reason" class="deletion-reason sg-textarea sg-textarea--tall"></textarea>
            <button class="sg-button sg-button--m sg-button--solid-light delete-acc"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">${Extension.buttons.delete}</span></button>
        </div>
    </div>
    `)
}

export function mmsg_s() {
    return ( /*html*/ `
    <div class="modal_back">
        <div class="modal_mmsg_s">
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">Mass Message Sender</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <textarea placeholder="${Extension.instructions.onePerLine}" class=" profile-links sg-textarea sg-textarea--tall"></textarea>
            ${
                Form.RadioGroup({
                    id: "msg-presets",
                    ClassName: ["presets"],
                    type: "row",
                    LookFor: {
                        name: "text",
                        id: "id"
                    },
                    items: [
                        {
                            id: "1",
                            text: "Alt Accounts",
                            value: "message"
                        },
                        {
                            id: "2",
                            text: "Link Spammer",
                            value: "message"
                        }
                    ]
                }).outerHTML
            }
            <textarea placeholder="Message content" class="message-content sg-textarea sg-textarea--tall"></textarea>
            <button class="sg-button sg-button--m sg-button--solid-light send-message"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">${Extension.buttons.sendMessages}</span></button>
        </div>
    </div>
    `)
}

export function mcompu() {
    return ( /*html*/ `
    <div class="modal_back">

        <div class="modal_mcomp_u">
            <div class="sg-spinner-container">
              <div class="sg-spinner-container__overlay">
                <div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div>
              </div>
            </div>
       
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">${Extension.titles.manageExtensionUsers}</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <div class="users"></div>
           
        </div>
    </div>
    `)
}

export function mmContentModal() {
    return ( /*html*/ `
    <div class="modal_back">
        <div class="modal_mass_content">
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">Mass Content Handler</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <textarea placeholder="Paste question links here" class=" profile-links sg-textarea sg-textarea--tall"></textarea>
            <div class="warnpts" style='width: 500px;
            padding: 10px;
            text-align: center;'>

            <label class="sg-checkbox" for="pts">
              <input type="checkbox" class="sg-checkbox__element" id="pts">
              <div class="sg-checkbox__ghost" aria-hidden="true">
                <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
              </div>
              <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label" style='margin-left:5px'>${Extension.buttons.takePoints}</span>
            </label>
            <label class="sg-checkbox" for="warn" style='margin-left: 10%;'>
              <input type="checkbox" class="sg-checkbox__element" id="warn">
              <div class="sg-checkbox__ghost" aria-hidden="true">
                <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
              </div>
              <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label" style='margin-left:5px'>${Extension.buttons.warnUser}</span>
            </label>
          </div>
            <textarea placeholder="Deletion reason (leave blank if confirming)" class="message-content sg-textarea sg-textarea--tall"></textarea>
            <button class="sg-button sg-button--m sg-button--solid-light delete-content"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">${Extension.buttons.delete}</span></button>
            <button class="sg-button sg-button--m sg-button--solid-light confirm-content"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">${Extension.buttons.confirm}</span></button>
        </div>
    </div>
    `)
}
