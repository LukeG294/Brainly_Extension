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
                            text: "Incomplete MD",
                            value: `Hey there! Brainly is all about giving students the tools they need to tackle future problems on their own, so it's important to always show your work. Your answers didn't contain enough explanation to follow our guidelines, so all of your answers have been removed. In the future, please be sure to elaborate and add more to your answers, such as full explanations, examples, and any information that can help our fellow Brainiacs. Thanks!
                            `
                        },
                        {
                            id: "2",
                            text: "Questions",
                            value: `Hello! We are sorry for any confusion about your questions being removed. While some may have been valid, many of your questions violated our Content Guidelines: https://brainly.com/content-guidelines. Help us keep Brainly's Knowledge Base quality high by getting familiar with our guidelines so that this does not happen in the future.`
                        },
                        {
                            id: "3",
                            text: "Plagiarism",
                            value: `Plagiarism is serious business - remember that it is forbidden to post any content from another website, person, or source without proper permission. We are sure that you can do it on your own! Please refrain from plagiarizing answers in the future, otherwise your account may be suspended. For more help please check our Answering Guidelines: https://faq-us.brainly.com/hc/en-us/articles/5193292847250-Answering-Guidelines. Please note that we have removed your post.`
                        },
                        {
                            id: "4",
                            text: "Comments",
                            value: `Hey there! Brainly's comment feature allows you to ask follow-up questions or clarify a question or answer. The majority of your comments did not meet these guidelines, so they have been removed. All comments should be relevant to the question being asked. If you do create comments that violate these guidelines in the future, your account may be suspended. Thank you for your understanding! Please review the Community Guidelines for additional information: https://brainly.com/community-guidelines`
                        },
                        {
                            id: "5",
                            text: "Deletion Request",
                            value: `Hello! We have received your request to have your account permanently removed from Brainly. To finalize the process, please send an email to Brainly Administrators by visiting this link: https://faq-us.brainly.com/hc/en-us/requests/new To send the request, select the 'General form' option. We're sorry to see you go!`
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
        <div class="modal_mass_content" style = "display: flex; flex-direction: column; max-height:95%; min-height:300px;">
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">Mass Content Handler</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <textarea style = "flex: 1;" placeholder="Paste question links here, one link per line" class=" profile-links sg-textarea sg-textarea--tall"></textarea>

            <div class="warnpts" style='width: 600px;'>
          </div>
        </div>
    </div>
    `)
}
