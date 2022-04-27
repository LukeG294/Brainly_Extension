import {addResponseButtonsApprove, addResponseButtonsBasic, addResponseButtonsConfirm, addResponseButtonsFetchReported, addResponseButtonsUnverify} from "./responses"
import {addTaskButtonsBasic, addTaskButtonsConfirmation, addTaskButtonsDeletion, addTaskButtonsReportedContent} from "./tasks"
import { checkUser, checkPermissionSet } from "../common/permission_system"

//@ts-ignore

async function addPerPage(){
  let permsArr = sessionStorage.userPerms
   //tasks page
  if(window.location.href.includes("task") || (!window.location.href.includes("responses") && !window.location.href.includes("comments_tr"))){
    if (permsArr.includes("12")){
      addTaskButtonsBasic()
    }
    if (permsArr.includes("7")){
      addTaskButtonsDeletion()
    }
    if (permsArr.includes("0")){
      addTaskButtonsConfirmation()
    }
    if (permsArr.includes("2")){
      addTaskButtonsReportedContent()
    }
  }

  //responses page
  if(window.location.href.includes("responses")){
    if (permsArr.includes("12")){
      addResponseButtonsBasic()
    }
    if (permsArr.includes("0")){
      addResponseButtonsConfirm()
    }
    if (permsArr.includes("1")){
      addResponseButtonsApprove()
    }
    if (permsArr.includes("2")){
      addResponseButtonsFetchReported()
    }
    if (permsArr.includes("3")){
      addResponseButtonsUnverify()
    }
  }

  //comments page
  if(window.location.href.includes("comments_tr")){

  }

}

setTimeout(() => {
  checkUser("old", addPerPage)
}, 100);