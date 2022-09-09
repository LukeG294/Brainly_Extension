
import{ permissionChecks } from "../homepage/Exports"
import Notify from "scripts/common/Notifications/Notify";
import Status from "scripts/common/Notifications/Status";
import{  editUser, getPermissionsWithDocId} from "../../common/permissions/PermissionSystem"

export async function manage_user(){
    let manage = new Status("manage");
    document.getElementById('main-right').insertAdjacentHTML('beforeend',`
    <div class="manage-user"><h2 class="sg-headline sg-headline--text-blue-40 sg-headline--medium">MANAGE EXTENSION PERMISSIONS</h2></div>
    <div class="changePermissions">${permissionChecks()}</div>
    `)
    document.querySelector('.manage-user').addEventListener('click', async function(){
        let permMenu = document.querySelector('.changePermissions')
        if (!permMenu.classList.contains('open')){
            manage.Show("fetching permissions...", "blue", true)
            //@ts-expect-error
            let userDataProfilePage = document.querySelector('[rel=canonical]').href.split("/")[4].split("-")
            let prevPerms = await getPermissionsWithDocId(userDataProfilePage[0], userDataProfilePage[1]);
            let decodedPerms = atob(prevPerms.split(",")[0]).split(",");
            permMenu.classList.add("open")
            manage.Close()
            
            if(decodedPerms[0]){
                decodedPerms.forEach((perm) => {
                    (<HTMLInputElement>document.querySelector(`.changePermissions input[id = '${perm}']`)).checked = true;
                })
            }
            document.querySelector(".submit-permissions").addEventListener("click", async function(){
                
                this.querySelector(".spinner-container").classList.add("show");

                let perms = []
                let userOptions = document.querySelectorAll(".changePermissions input")
                for (let index = 0; index < userOptions.length; index++) {
                    const element = userOptions[index];
                    if ((<HTMLInputElement>element).checked) perms.push(element.id);
                }
                try{
                    await editUser(prevPerms.split(",")[1], perms)
                }catch(err){
                    Notify.Flash(err, "error")
                }
                this.querySelector(".spinner-container").classList.remove("show");
                Notify.Flash("Permissions changed successfully!", "success");
                permMenu.classList.remove("open")
            })
                
        } else {
            permMenu.classList.remove("open")
        }
    })
}