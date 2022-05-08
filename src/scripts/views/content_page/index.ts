import {addResponseButtonsApprove, addResponseButtonsConfirm, addResponseButtonsFetchReported, addResponseButtonsUnverify, addResponseButtonsDelete} from "./Responses"
import { addTaskButtonsConfirmation, addTaskButtonsDeletion, addTaskButtonsReportedContent} from "./Tasks"
//import { checkUser, checkPermissionSet } from "../common/permission_system"
import {add_icons} from "./ContentPageButtons"
import {addticket, addTaskButtonsBasic} from "./ButtonFunctions"

//@ts-ignore

async function addPerPage(){
  let permsArr = localStorage.userPerms.split(",")
  
  //functions for all pages
  add_icons()
  if(permsArr.includes("1") || permsArr.includes("2") || permsArr.includes("3") || permsArr.includes("4")){
    addticket()
    addTaskButtonsBasic()
  }

  //tasks page
  if(window.location.href.includes("task") || (!window.location.href.includes("responses") && !window.location.href.includes("comments_tr"))){
    if (permsArr.includes("1") || permsArr.includes("2") || permsArr.includes("3") || permsArr.includes("4")){
      addTaskButtonsDeletion()
      addTaskButtonsReportedContent()
      addTaskButtonsConfirmation()
    }
  
  }

  //responses page
  if(window.location.href.includes("responses")){
    if (permsArr.includes("1") || permsArr.includes("2") || permsArr.includes("3") || permsArr.includes("4")){
      addResponseButtonsConfirm()
      addResponseButtonsFetchReported()
      addResponseButtonsDelete()
      addResponseButtonsApprove()
    }
   
    if (permsArr.includes("3") || permsArr.includes("4")){
      addResponseButtonsUnverify()
    }
  }

  //comments page
  if(window.location.href.includes("comments_tr")){

  }

}

if(localStorage.canUse === "true"){
  addPerPage()
}