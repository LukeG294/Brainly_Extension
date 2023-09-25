import { mass_msg, mass_accdel, md_content, reportedCommentsDeleter, verification_queue } from "./homepage/Admin";
import AdminPanel from "./homepage/Admin"
import userSearch from "./homepage/userSearch"
import { ModObserver } from "./homepage/Exports";
import { runCheck } from "../../scripts/common/ModFunctions";
import { main_control_permissions } from "configs/config";

let {Administrator, Moderator} = main_control_permissions()
runCheck(md_content, Administrator)
runCheck(reportedCommentsDeleter, Administrator)
runCheck(AdminPanel.MassMsg, Administrator)
runCheck(ModObserver, Moderator)
//userSearch()
//verification_queue()

  
    
   


