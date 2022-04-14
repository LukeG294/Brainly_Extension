import {add_del_menu, deletion_listener, preset_delrsn} from "./del_menu_exp"

function insert_data(){
    document.querySelector(".mod-profile-panel").insertAdjacentHTML("beforeend", /*html*/`
        <button class="sg-button sg-button--m sg-button--outline sg-button--icon-only user-del-btn">
            <span class="sg-button__icon sg-button__icon--m">
            <div class="sg-icon sg-icon--dark sg-icon--x32" style="height: 26px;width: 26px;">
                <svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg>
            </div><div class="mint-label__text" style="font-size: 13px;color: rgb(255, 121, 104);">delete user</div>
            </span>
        </button>
    `)
    document.querySelector(".user-del-btn").addEventListener("click", function(){
        document.querySelector("body").insertAdjacentHTML("afterbegin", <string>add_del_menu())
        preset_delrsn()
        deletion_listener()
        document.querySelector(".modal_close").addEventListener("click", function(){
            document.querySelector(".modal_back").remove()
        });
    });
}
if(
    ((localStorage.getItem("userAuth") && document.querySelector("span.pseudolink.show-form")) 
            || 
        document.querySelector("li.menu-element.profile.styled > a > img").getAttribute("title") === "TheSection")
        && 
    document.querySelector("div.info_top > span.ranking > h2 > a").innerHTML !== "Deleted account"
    ){
    insert_data()
}