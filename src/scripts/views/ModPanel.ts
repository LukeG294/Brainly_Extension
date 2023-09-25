import { mass_msg, mass_accdel, md_content, reportedCommentsDeleter, verification_queue } from "./homepage/Admin";
import AdminPanel from "./homepage/Admin"
import userSearch from "./homepage/userSearch"
import { ModObserver } from "./homepage/Exports";
import { insert_ticket, runCheck } from "../../scripts/common/ModFunctions";
import { get_feature_key_needed, main_control_permissions } from "configs/config";

async function insert(){
    //let permissions =  await main_control_permissions()
    
    
    runCheck(md_content,  await get_feature_key_needed("admin_content_deleter"))
    runCheck(reportedCommentsDeleter,  await get_feature_key_needed("reported_comments_deleter"))
    runCheck(AdminPanel.MassMsg,  await get_feature_key_needed("mass_messager"))
    runCheck(ModObserver,  await get_feature_key_needed("homepage_tickets"))
    runCheck(verification_queue,  await get_feature_key_needed("verification_queue"))
   
}
insert()
//userSearch()


  
    
   


