import {addResponseButtonsApprove, addResponseButtonsBasic, addResponseButtonsConfirm, addResponseButtonsFetchReported, addResponseButtonsUnverify} from "./responses"
import {addTaskButtonsBasic, addTaskButtonsConfirmation, addTaskButtonsDeletion, addTaskButtonsReportedContent} from "./tasks"
import { checkUser, checkPermissionSet } from "../common/permission_system"
import {add_icons} from "./content_page_buttons"
import {addticket} from "./button_functions"

//@ts-ignore

async function addPerPage(){
  let permsArr = localStorage.userPerms
   //tasks page
  add_icons()
  if(permsArr.includes("12")){
    addticket()
  }
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

checkUser("old", addPerPage)