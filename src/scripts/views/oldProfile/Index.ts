
import {deleteUserBtn} from "./DelMenuExp"
import {show_recent_warnings} from "./RecentWarnings"
import {QuestionCount, CommentCount, AnswerLink} from "./UserBio"
import {manage_user} from "./ManageUser"
import {ryverTask} from "./BanTask"
import {reqMD} from "../../common/Ryver/reqMD"
import Components from "scripts/Items/Components"

async function oldProfile(){
  let uid = (<string>window.location.href).split("-")[1].split("/")[0];
  if (localStorage.getItem("userAuth")) ryverTask((<string>window.location.href).split("-")[1].split("/")[0])
  let perms = localStorage.userPerms.split(",")

  AnswerLink()
  QuestionCount()
  CommentCount()
  
  document.querySelector(".mod-profile-panel").insertAdjacentHTML("beforeend", "<div class = 'modMenu'></div>")
  if (localStorage.getItem("userAuth")) reqMD({
    id: uid, 
    element: document.querySelector(".modMenu"), 
    type: "mod", 
    position: "afterbegin",
    button: Components.Button({
      size: "m",
      type: "solid",
      ClassNames: ["reqMD"],
      icon: "comment",
      iconSize: "16"
    }),
  })

  if(perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    show_recent_warnings(uid)
  }

  if(perms.includes("3") || perms.includes("4")) deleteUserBtn();

  if (perms.includes("4")) manage_user();
}

if(localStorage.canUse === "true") oldProfile();