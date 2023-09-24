import { mass_msg, mass_accdel, md_content, reportedCommentsDeleter, verification_queue } from "./homepage/Admin";
import AdminPanel from "./homepage/Admin"
import userSearch from "./homepage/userSearch"
import { ModObserver } from "./homepage/Exports";
import { runCheck } from "../../scripts/common/ModFunctions";
import { main_control_permissions } from "configs/config";

let {admin, mod} = main_control_permissions()
runCheck(md_content, admin)
runCheck(reportedCommentsDeleter, admin)
runCheck(AdminPanel.MassMsg, admin)
runCheck(ModObserver, mod)
//userSearch()
//verification_queue()

  
    
   


