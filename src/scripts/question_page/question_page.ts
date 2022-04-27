import {confirmButton} from "./question_exports"
//@ts-ignore

async function questionPage(){
  let perms = localStorage.userPerms
  if (perms.includes("9")){
    confirmButton()
  }
}

if(localStorage.canUse){
  questionPage()
}
