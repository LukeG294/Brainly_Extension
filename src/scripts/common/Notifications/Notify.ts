export default new class Notify{
    Dialog(heading:string, content:string, confirmfn, showConfirm:boolean, args?, removeargs?){
        if (showConfirm === true){
          document.querySelector("body").insertAdjacentHTML("afterbegin", /*html*/`
          <div class="js-dialog sg-dialog__overlay sg-dialog__overlay--scroll sg-dialog__overlay--open" style="z-index: 999;">
            <div tabindex="0"></div><div role="dialog" class="sg-dialog__container sg-dialog__container--size-m sg-dialog__container--open" aria-modal="true" tabindex="-1">
             
              <div class="sg-dialog__header" id="dialog-header">
                <div class="sg-flex sg-flex--margin-bottom-m">
                  <h1 class="sg-headline">${heading}</h1>
                </div>
              </div>
              <div class="sg-dialog__body">
                <div class="sg-flex sg-flex--margin-bottom-m sg-text">${content}</div>
                <div class="sg-flex sg-flex--justify-content-flex-end sg-space-x-s">
                  <button class="sg-button sg-button--m sg-button--outline" onclick = "document.querySelector('.js-dialog').remove()"><span class="sg-button__text">cancel</span></button>
                  <button class="sg-button sg-button--m sg-button--solid returnfun"><span class="sg-button__text">proceed</span></button>
                </div>
              </div>
            </div>
          <div tabindex="0">
          </div>
        </div>`)
        document.querySelector(".js-dialog .returnfun").addEventListener("click", () => {
          document.querySelector(".js-dialog").remove()
          confirmfn(args)
          removeargs.remove()
        });
        } else {
          document.querySelector("body").insertAdjacentHTML("afterbegin", /*html*/`
          <div class="js-dialog sg-dialog__overlay sg-dialog__overlay--scroll sg-dialog__overlay--open" style="z-index: 999;">
            <div tabindex="0"></div><div role="dialog" class="sg-dialog__container sg-dialog__container--size-m sg-dialog__container--open" aria-modal="true" tabindex="-1">
             
              <div class="sg-dialog__header" id="dialog-header">
                <div class="sg-flex sg-flex--margin-bottom-m">
                  <h1 class="sg-headline">${heading}</h1>
                </div>
              </div>
              <div class="sg-dialog__body">
                <div class="sg-flex sg-flex--margin-bottom-m">${content}</div>
                <div class="sg-flex sg-flex--justify-content-flex-end sg-space-x-s">
                 
                  <button class="sg-button sg-button--m sg-button--solid" onclick = "document.querySelector('.js-dialog').remove()"><span class="sg-button__text">close</span></button>
                </div>
              </div>
            </div>
          <div tabindex="0">
          </div>
        </div>`)
        }
      
        
    }

    Flash(message:string, type: "success" | "error" | "info"){
        let flashbox = document.querySelector(".flash-messages-container")? document.querySelector(".flash-messages-container"):document.querySelector("#flash-msg");
        let flashmsg = document.createElement("div");
        
        flashmsg.classList.add("sg-flash")
        flashmsg.innerHTML = /*html*/`
                <div class="sg-flash__message sg-flash__message--${type}">
                    <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${message}</div>
                </div>
        `;
        flashmsg.addEventListener("click", function(){flashmsg.remove();});
        flashbox.appendChild(flashmsg);
    }
}
