import {addResponseButtons} from "./responses"
import {addTaskButtons} from "./tasks"
import {addticket} from "./button_functions"
import { getPermissions } from "../common/permission_system"




    //tasks page
    if(window.location.href.includes("task") || (!window.location.href.includes("responses") && !window.location.href.includes("comments_tr"))){
        addTaskButtons()
        console.log("taskpage")
    }

    //responses page
    if(window.location.href.includes("responses")){
        addResponseButtons()
    }

    //comments page
    if(window.location.href.includes("comments_tr")){

    }
    


   


async function checkPermissionSet(){
  let permissionSet = await getPermissions()
  if (permissionSet >= 4){
    addticket()
    
  }
}
checkPermissionSet()
