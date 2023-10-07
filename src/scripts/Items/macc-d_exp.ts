import Extension from "../../locales/en/localization.json"
import Form from "./Form"

export function macc_d() {
    return ( /*html*/ `
    <div class="modal_back">
        <div class="modal_accdel">
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">User Management</h1>
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
            <textarea placeholder="Reason or message. Tip: use {user} to replace with the username." class="deletion-reason sg-textarea sg-textarea--tall"></textarea>
            <button class="sg-button sg-button--m sg-button--solid-light delete-acc"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Delete Account</span></button>
            <button class="sg-button sg-button--m sg-button--solid-light add-user"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Give Extension Permission</span></button>
            <button class="sg-button sg-button--m sg-button--solid-light remove-user"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Remove Extension Permission</span></button>
            <button class="sg-button sg-button--m sg-button--solid-light send-message"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Send Message</span></button>
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
        <div class="modal_mass_content" style = "display: flex; flex-direction: column; max-height:95%; min-height:300px;">
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">Mass Question Deleter</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <textarea style = "flex: 1;" placeholder="Paste question links here, one link per line" class=" profile-links sg-textarea sg-textarea--tall"></textarea>

            <div class="warnpts" style='width: 600px;'>
          </div>
        </div>
    </div>
    `)
}
