import Extension from "../../locales/en/localization.json"
import Form from "./Form"

export function macc_d(presets) {
    
    return ( /*html*/ `
    <div class="modal_back">
        <div class="modal_accdel">
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">User Management</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <textarea placeholder="Paste profile links here, one per line." class=" profile-links sg-textarea sg-textarea--tall"></textarea>
                ${
                    Form.RadioGroup({
                        ClassName: ["presets"],
                        id: "del-presets",
                        type: "row",
                        items: presets,
                        LookFor: {
                            name: "text",
                            id: "id"
                        }
                    }).outerHTML
                }
            <textarea placeholder="Permissions, deletion reason, or message." class="deletion-reason sg-textarea sg-textarea--tall"></textarea>
          
            <button class="sg-button sg-button--m sg-button--solid-light add-user"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Set Extension Permission</span></button>
            <button class="sg-button sg-button--m sg-button--solid-light remove-user"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Remove Extension Permission</span></button>
            <button class="sg-button sg-button--m sg-button--solid-light send-message"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Send Message</span></button>
            <button class="sg-button sg-button--m sg-button--solid-light delete-acc"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Delete Account</span></button>
            
        </div>
    </div>
    `)
}




export function mmContentModal() {
    return ( /*html*/ `
    <div class="modal_back">
        <div class="modal_mass_content" style = "display: flex; flex-direction: column; max-height:95%; min-height:300px;">
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">Question Management</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <textarea style = "flex: 1;" placeholder="Paste question links here, with a new line for each link." class=" profile-links sg-textarea sg-textarea--tall"></textarea>
          
            <div class="question-area" style="overflow:scroll;">
            
            </div>
            <button class="sg-button sg-button--m sg-button--solid-light confirm-questions"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Confirm Questions</span></button>
            <button class="sg-button sg-button--m sg-button--solid-light delete-questions"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Remove Questions</span></button>
            <button class="sg-button sg-button--m sg-button--solid-light fetch-details"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Fetch Details</span></button>
            <div class="warnpts" style='width: 600px;'>
          </div>
        </div>
    </div>
    `)
}
