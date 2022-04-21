/**
*
* @param {string} type Takes 3 values, success, error, info. Dhows default message if nothing provided
*
*/
export function showMessage(
    message:string,
    type:string = ""
    ){
        let flashbox = document.querySelector(".flash-messages-container")? document.querySelector(".flash-messages-container"):document.querySelector("#flash-msg");
        if(type !== ""){
            type = "sg-flash__message--"+type;
        }
        let flashmsg = document.createElement("div");
        flashmsg.classList.add("sg-flash")
        flashmsg.innerHTML = /*html*/`
                <div class="sg-flash__message ${type}">
                    <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${message}</div>
                </div>
        `;
        flashmsg.addEventListener("click", function(){flashmsg.remove();});
        flashbox.appendChild(flashmsg);

}