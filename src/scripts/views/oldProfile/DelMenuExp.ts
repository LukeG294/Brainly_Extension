import User from "../../common/User"
import Extension from "../../../locales/en/localization.json"
import Form from "scripts/Items/Form"
import Components from "scripts/Items/Components"
import Ryver from "scripts/common/Ryver/Ryver"

function deletionMenu(){
    document.body.insertAdjacentHTML("afterbegin", /*html*/`
        <div class="modal_back">
            <div class="modal-accdel">
                <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div></div>
            <div class = "modal_close" onclick = "document.querySelector('.modal_back').remove()">
                <div class="sg-icon sg-icon--dark sg-icon--x32">
                    <svg class="sg-icon__svg"><use xlink:href="#icon-close"></use></svg>
                </div>
            </div>
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45; margin-bottom:8px;">Delete User</h1>
            <div class="content">
                <textarea placeholder="Add Reason Here" class="sg-textarea sg-textarea--tall del-rsn"></textarea>
                ${
                    Form.RadioGroup({
                        ClassName: ["presets"],
                        id: "presets",
                        type: "row",
                        items: [
                            {
                                id: "1",
                                text: "Link Spammer",
                                value: "Link Spammer"
                            },
                            {
                                id: "2",
                                text: "Alt Accounts",
                                value: "Alternate Accounts"
                            },
                            {
                                id: "3",
                                text: "Inappropriate Username",
                                value: "Inappropriate Username"
                            }
                        ],
                        LookFor: {
                            name: "text",
                            id: "id"
                        }
                    }).outerHTML
                }
                <button class="sg-button sg-button--m sg-button--solid-light delete-acc"><span class="sg-button__text">Delete!</span></button>
            </div>
            </div>
        </div>
    `)
    document.querySelector(".presets").addEventListener("change", function(){
        let rsn = document.querySelector(".presets input:checked").getAttribute("value");
        (<HTMLInputElement>document.querySelector(".modal-accdel .del-rsn")).value = rsn;
    });
    document.querySelector(".modal-accdel .delete-acc").addEventListener("click", async function(){
        let uid = document.querySelector("#main-left > div.personal_info > div.header > div.info > div.info_top > span.ranking > h2 > a").getAttribute("href").split("-")[1]
        document.querySelector(".modal-accdel .spinner-container").classList.add("show");
            await User.Delete(uid)
            await sendmsg();
        document.querySelector(".modal-accdel .spinner-container").classList.remove("show");
    })
}
async function sendmsg(){
    let del_reason = (<HTMLInputElement>document.querySelector(".modal-accdel .del-rsn")).value;
    let mod_name = document.querySelector(".menu-element.profile.styled > a > span:nth-child(2)").innerHTML
    let profileLink = "https://brainly.com" + (<HTMLAnchorElement>document.querySelector("#main-panel > div.mint-header__container > div.mint-header__right.mint-hide-for-mobile.menu-right > ul > li.menu-element.profile.styled.current > div > div > div.right > h2 > a:nth-child(1)")).href
    if(del_reason === ''){del_reason = "Not Provided"};

    let messageBody = `---
**Deleted account**: ${window.location.href}
**Why**: ${del_reason}
###### **Moderator**: [${mod_name}](${profileLink})`

    await Ryver.Message("1291498", messageBody, "workrooms", false)
    location.reload()
}
export function deleteUserBtn(){
    document.querySelector(".modMenu").insertAdjacentElement("beforeend", 
        Components.Button({
            size: "m",
            type: "solid",
            ClassNames: ["user-del-btn"],
            icon: "trash",
            iconSize: "16"
        })
    )
    document.querySelector(".user-del-btn").addEventListener("click", function(){
        deletionMenu()
    });
}