import {  mass_accdel, md_content, reportedCommentsDeleter, verification_queue, firebase_append } from "./homepage/Admin";
import AdminPanel from "./homepage/Admin"
import userSearch from "./homepage/userSearch"
import { ModObserver, quick_deleter } from "./homepage/Exports";
import { insert_ticket, runCheck } from "../../scripts/common/ModFunctions";
import {  main_control_permissions, check_version, extension_server_url } from "configs/config";

async function insert(){
    //let permissions =  await main_control_permissions()
    let key = await fetch(`${extension_server_url()}/configs/feature_keys`).then(data => data.json())
    
    runCheck(md_content,  key["admin_content_deleter"])
    runCheck(reportedCommentsDeleter,  key["reported_comments_deleter"])
    runCheck(AdminPanel.Accdel,  key["user_manager"])
   
    runCheck(firebase_append,  key["panel_link_to_backend"])
    runCheck(ModObserver,  key["homepage_tickets"])
    runCheck(verification_queue,  key["verification_queue"])
    runCheck(quick_deleter,  key["homepage_quick_delete"])
}

insert()
userSearch()



  
    
   


