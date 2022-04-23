import {macc_d} from "../common/macc-d_exp"
export function add_admin(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
    <li class="sg-menu-list__element macc-d">   
        <a class = "sg-menu-list__link">Mass-Account Deletion</a>
    </li>
    <li class="sg-menu-list__element mmsg-s">   
        <a class = "sg-menu-list__link">Mass-Message Users</a>
    </li>
    `)
    document.querySelector(".macc-d").addEventListener("click", function(){
        document.querySelector("body").insertAdjacentHTML("afterbegin", macc_d());
        document.querySelector(".modal_close").addEventListener("click", function(){document.querySelector(".modal_back").remove()})
    })
}