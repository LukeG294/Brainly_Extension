export function macc_d(){
    return(/*html*/`
    <div class="modal_back">
        <div class="modal_accdel">
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">Mass Account Deleter</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <textarea placeholder="Paste profile links here, one link per line" class=" profile-links sg-textarea sg-textarea--tall"></textarea>
            <div class="presets">
                <label class="sg-radio sg-radio--xxs" for="links">
                    <input type="radio" class="sg-radio__element" name="group1" id="links" reason = "Link Spammer">
                    <span class="sg-radio__ghost" aria-hidden="true"></span>
                    <span class="sg-text sg-text--small sg-text--bold sg-radio__label">Link spammer</span>
                </label>
                <label class="sg-radio sg-radio--xxs" for="alt">
                    <input type="radio" class="sg-radio__element" name="group1" id="alt" reason = "Alternate Accounts">
                    <span class="sg-radio__ghost" aria-hidden="true"></span>
                    <span class="sg-text sg-text--small sg-text--bold sg-radio__label">Alt Accounts</span>
                </label>
                <label class="sg-radio sg-radio--xxs" for="username">
                    <input type="radio" class="sg-radio__element" name="group1" id="username" reason = "Inappropriate Username">
                    <span class="sg-radio__ghost" aria-hidden="true"></span>
                    <span class="sg-text sg-text--small sg-text--bold sg-radio__label">Inappropriate Username</span>
                </label>
            </div>
            <textarea placeholder="Reason" class="deletion-reason sg-textarea sg-textarea--tall"></textarea>
            <button class="sg-button sg-button--m sg-button--solid-light delete-acc"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Delete!</span></button>
        </div>
    </div>
    `)
}

export function mmsg_s(){
    return(/*html*/`
    <div class="modal_back">
        <div class="modal_mmsg_s">
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">Mass Message Sender</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <textarea placeholder="Paste profile links here, one link per line" class=" profile-links sg-textarea sg-textarea--tall"></textarea>
            <div class="presets">
                <label class="sg-radio sg-radio--xxs" for="links">
                    <input type="radio" class="sg-radio__element" name="group1" id="links" reason = "Link Spammer">
                    <span class="sg-radio__ghost" aria-hidden="true"></span>
                    <span class="sg-text sg-text--small sg-text--bold sg-radio__label">Link spammer</span>
                </label>
                <label class="sg-radio sg-radio--xxs" for="alt">
                    <input type="radio" class="sg-radio__element" name="group1" id="alt" reason = "Alternate Accounts">
                    <span class="sg-radio__ghost" aria-hidden="true"></span>
                    <span class="sg-text sg-text--small sg-text--bold sg-radio__label">Alt Accounts</span>
                </label>
                <label class="sg-radio sg-radio--xxs" for="username">
                    <input type="radio" class="sg-radio__element" name="group1" id="username" reason = "Inappropriate Username">
                    <span class="sg-radio__ghost" aria-hidden="true"></span>
                    <span class="sg-text sg-text--small sg-text--bold sg-radio__label">Inappropriate Username</span>
                </label>
            </div>
            <textarea placeholder="Message content" class="message-content sg-textarea sg-textarea--tall"></textarea>
            <button class="sg-button sg-button--m sg-button--solid-light send-message"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Send Messages!</span></button>
        </div>
    </div>
    `)
}

export function mcompu(){
    return(/*html*/`
    <div class="modal_back">

        <div class="modal_mcomp_u">
            <div class="sg-spinner-container">
              <div class="sg-spinner-container__overlay">
                <div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div>
              </div>
            </div>
       
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">Manage Extension Users</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <div class="users"></div>
           
        </div>
    </div>
    `)
}

export function verificationQueue(){
    return(/*html*/`
    <div class="modal_back">

        <div class="modal_mcomp_u">
            <div class="sg-spinner-container">
              <div class="sg-spinner-container__overlay">
                <div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div>
              </div>
            </div>
       
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45;">Answer Verification Queue</h1>
            <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>
            <div class="answers"></div>
           
        </div>
    </div>
    `)
}
