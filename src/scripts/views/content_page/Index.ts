//import { checkUser, checkPermissionSet } from "../common/permission_system"
import {
    add_icons
} from "./ContentPageButtons"
import Panel from "./Panel"

//@ts-ignore

async function addPerPage() {
    let permsArr = localStorage.userPerms.split(",")

    //functions for all pages
    add_icons()
    document.querySelector("#content-old > div:nth-child(3) > p").insertAdjacentHTML('beforeend', "<div class = 'mass-actions'></div>")
    if (permsArr.includes("1") || permsArr.includes("2") || permsArr.includes("3") || permsArr.includes("4")) {
        Panel.Basic()
    }

    //tasks page
    if (window.location.href.includes("task") || (!window.location.href.includes("responses") && !window.location.href.includes("comments_tr"))) {
        if (permsArr.includes("2") || permsArr.includes("3") || permsArr.includes("4")) {
            Panel.Ques()
        }

    }

    //responses page
    if (window.location.href.includes("responses")) {
        if (permsArr.includes("2") || permsArr.includes("3") || permsArr.includes("4")) {
            Panel.Ans()
        }
    }

    //comments page
    if (window.location.href.includes("comments_tr")) {

    }

}

if (localStorage.canUse === "true") {
    addPerPage()
}
